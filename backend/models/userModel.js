const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },
  photo: {
    type: String,
    default: 'default.jpeg',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This will ONLY work on SAVE and CREATE!!!!!! .save(), .create() i mean
      validator: function (el) {
        return el === this.password; // abc === abc
      },
      message: 'Passwords do not match!',
    },
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// before the .save()
userSchema.pre('save', async function (next) {
  // if not modified go to the next middleware
  if (!this.isModified('password')) return next();

  // salting (adding a random string to the password, so that two equal passwords do not produce the same hash)
  // .hash is async so it will return a promise
  // hash the password with a cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // after the validation was successful we really do not want the 'confirm password' to be persisted to the database
  this.passwordConfirm = undefined;
  next();
});

// function for comparing passwords when logging in
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;

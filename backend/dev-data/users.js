const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Sam Hasan',
    email: 'admin@example.com',
    password: bcrypt.hashSync('test1234', 10),
    role: 'admin',
    active: true,
    photo: 'user-1.jpeg',
  },
];

module.exports = users;

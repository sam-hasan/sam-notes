const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Sam Hasan',
    email: 'admin@example.com',
    password: bcrypt.hashSync('test1234', 10),
    role: 'admin',
    active: true,
    photo: '/images/users/user-1.jpeg',
  },
  {
    name: 'Jane Austen',
    email: 'jane@example.com',
    password: bcrypt.hashSync('test1234', 10),
    role: 'user',
    active: true,
    photo: '/images/users/user-2.jpeg',
  },
  {
    name: 'Jaime Lannister',
    email: 'jaime@example.com',
    password: bcrypt.hashSync('test1234', 10),
    role: 'user',
    active: true,
    photo: '/images/users/user-3.jpeg',
  },
];

module.exports = users;

let users = [
  {
    id: 0,
    name: 'first',
    age: 16,
  },
  {
    id: 1,
    name: 'john',
    age: 21,
  },
  {
    id: 2,
    name: 'doe',
    age: 24,
  },
  {
    id: 3,
    name: 'bhargav',
    age: 22,
  },
];
let { usersData } = require('../src/controller');
if (usersData != null) {
  users = usersData;
}
module.exports = users;

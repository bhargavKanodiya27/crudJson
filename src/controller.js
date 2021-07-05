let users = require('../dataset/users.js');
let usersData = users;
const addUser = async (req, res, next) => {
  try {
    let { id, name, age } = req.body;
    usersData.find((element) => {
      if (element.id == id) {
        return res
          .status(500)
          .send({ is_error: true, message: 'User id already exists' });
      }
    });
    var newObject = { id, name, age };
    usersData.push(newObject);
    return res
      .status(201)
      .send({ is_error: false, message: 'User created successfully' });
  } catch (err) {
    return res.status(500).send({ is_error: true, message: err.message });
  }
};
const updateUser = async (req, res, next) => {
  try {
    let { id, name, age } = req.body;
    usersData.find((element) => {
      if (element.id == id) {
        (element.name = name), (element.age = age);
        return res
          .status(200)
          .send({ is_error: false, message: 'User updated successfully' });
      }
    });
    var newObject = { id, name, age };
    usersData.push(newObject);
    return res
      .status(201)
      .send({ is_error: false, message: 'New User Created' });
  } catch (err) {
    return res.status(500).send({ is_error: true, message: err.message });
  }
};
const deleteUser = async (req, res, next) => {
  try {
    let { id } = req.body;
    let updatedData = usersData.filter((element) => element.id !== id);
    if (updatedData.length != usersData.length) {
      usersData = updatedData;
      return res
        .status(201)
        .send({ is_error: false, message: 'User deleted successfully' });
    }
    return res.status(404).send({ is_error: true, message: 'User not found' });
  } catch (err) {
    return res.status(500).send({ is_error: true, message: err.message });
  }
};
const getUser = async (req, res, next) => {
  try {
    let { id } = req.params;
    usersData.find((element) => {
      if (element.id == id) {
        return res.status(201).send({ is_error: false, data: element });
      }
    });
    return res.status(404).send({ is_error: true, message: 'No user found' });
  } catch (err) {
    return res.status(500).send({ is_error: true, message: err.message });
  }
};
module.exports = { addUser, updateUser, deleteUser, getUser, usersData };

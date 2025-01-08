const userModel = require('../models/userModel');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers();
    console.log(users)
    res.json(users);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = { getAllUsers, getUserById };

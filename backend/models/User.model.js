// models/userModel.js

const db = require('../lib/db');  // Import the database connection

// Function to create a new user
const createUser = async (username, email, password) => {
  try {
    const [rows, fields] = await db.execute(
      'INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?)',
      [email, password, first_name, last_name]
    );
    return rows;
  } catch (err) {
    throw new Error('Error creating user: ' + err.message);
  }
};

// Function to fetch all users
const getAllUsers = async () => {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM users');
    return rows;
  } catch (err) {
    throw new Error('Error fetching users: ' + err.message);
  }
};

module.exports = { createUser, getAllUsers };

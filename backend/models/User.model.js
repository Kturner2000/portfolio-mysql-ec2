// models/userModel.js

const db = require('../lib/db');  // Import the database connection

// Function to create a new user
const createUser = async (email, password, first_name, last_name) => {
  try {
    const [rows, fields] = await db.execute(
      'INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)',
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

const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) reject(err);
        resolve(results[0]); // Returns the first user or undefined if not found
      });
    });
  };

  const getUserById = (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) reject(err);
        resolve(results[0]); // Returns the first user or undefined if not found
      });
    });
  };

module.exports = { createUser, getAllUsers, findUserByEmail, getUserById };

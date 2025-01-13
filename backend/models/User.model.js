// models/userModel.js

const db = require('../lib/db');  // Import the database connection

// Function to create a new user
const createUser = async ({email, password, first_name, last_name} ) => {

  try {

    const [results] = await db.execute(`
      INSERT INTO users (email, password, first_name, last_name)
      VALUES (?, ?, ?, ?)`, [email, password, first_name, last_name])
     console.log(results)
  
    return results
  
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

const findUserByEmail = async (email) => {
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null; // Return the first user or null if not found
  } catch (err) {
    throw new Error('Error finding user by email: ' + err.message);
  }
};


  const getUserById = async (id) => {
    try {
      const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);

      return rows[0] || null; // Return the first user or null if not found
    } catch (err) {
      console.error('Error finding user by id:', err.message);
      throw err; 
    }
    
  };

  const deleteUserById = async (id) => {
    try {
      const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        throw new Error('No user found with the given id');
      } 
      return { message: 'User deleted successfully' };
    } catch (error){
      throw new Error('Error deleting user: ' + error.message);
    }
  }

module.exports = { createUser, getAllUsers, findUserByEmail, getUserById, deleteUserById };

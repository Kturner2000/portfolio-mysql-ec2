const mysql = require('mysql2');
require('dotenv').config({ path: './.local.env' });  // to load the .env file



// Create a connection pool (for better performance with multiple queries)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.promise().query('SELECT 1')
  .then(() => {
    console.log('Successfully connected to the database.');
  })
  .catch(err => {
    console.error('Error connecting to the database:', err.message);
  });

// Export the pool for use in models or controllers
module.exports = pool.promise();  // Using promise-based methods for async/await

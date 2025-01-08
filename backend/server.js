const express = require('express');
const app = express();
const cors = require('cors');
// const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const db = require('./lib/db');  // Import the database connection pool


// Middleware
app.use(cors());
// app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

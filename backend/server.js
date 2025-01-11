const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/User.routes');
require('dotenv').config();
var bodyParser = require('body-parser')


// Middleware
app.use(cors());
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


// Routes
app.use('/api', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

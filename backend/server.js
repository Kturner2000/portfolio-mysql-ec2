const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/User.routes');
const photoRoutes = require('./routes/Photo.routes')
require('dotenv').config();
var bodyParser = require('body-parser')


// Middleware
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));
app.use(express.json())
app.use(bodyParser.json())


// Routes
app.use('/api', userRoutes);
app.use('/api', photoRoutes);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

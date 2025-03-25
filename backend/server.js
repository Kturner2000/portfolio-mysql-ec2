const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/User.routes');
const photoRoutes = require('./routes/Photo.routes')
require('dotenv').config();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


// Middleware
// CORS Configuration
const corsOrigin = process.env.NODE_ENV === "production" 
    ? process.env.FRONTEND_URL 
    : "http://localhost:5173";

app.use(cors({ origin: corsOrigin, credentials: true }));

app.use(cookieParser());

app.use(express.json({ limit: "50mb" })); // Increase limit for JSON payloads
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json())


// Routes
app.use('/api', userRoutes);
app.use('/api', photoRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));
  app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

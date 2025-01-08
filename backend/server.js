const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

require("dotenv").config();
const dbConfig = require("./lib/db.js");

const app = express();
app.use(cors());
app.use(express.json());

const DB_PORT = process.env.PORT || 3000;

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL database");
});

app.listen(DB_PORT, () => {
    console.log(`Server running on port ${DB_PORT}`);
});

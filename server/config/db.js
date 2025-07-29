// require('dotenv').config(); // Load .env variables
// const mysql = require("mysql2");

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// const dbname = process.env.DB_NAME;

// db.connect((err) => {
//   if (err) {
//     console.error("Database connection failed:", err.stack);
//     return;
//   }
//   console.log("Connected to database.");
// });

// module.exports = db;


const dotenv = require('dotenv');
dotenv.config();

const mysql = require('mysql2');

const isProduction = process.env.NODE_ENV === 'production';

const db = mysql.createConnection({
  host: isProduction ? process.env.PROD_DB_HOST : process.env.DEV_DB_HOST,
  user: isProduction ? process.env.PROD_DB_USER : process.env.DEV_DB_USER,
  password: isProduction ? process.env.PROD_DB_PASSWORD : process.env.DEV_DB_PASSWORD,
  database: isProduction ? process.env.PROD_DB_NAME : process.env.DEV_DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to database.");
});

module.exports = db;

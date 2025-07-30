const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', require('./routes/auth'));

// Test Route
app.get('/', (req, res) => {
  res.send('Billing App API is running');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// const dotenv = require('dotenv');
// dotenv.config();

// const express = require('express');
// const path = require('path');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');

// const app = express();

// const isProduction = process.env.NODE_ENV === 'production';

// const PORT = isProduction ? process.env.PROD_PORT : process.env.DEV_PORT;
// const CLIENT_URL = isProduction ? process.env.PROD_CLIENT_URL : process.env.DEV_CLIENT_URL;

// // console.log("Running in:", process.env.NODE_ENV);
// // console.log("PORT from env:", PORT);
// // console.log("CLIENT_URL from env:", CLIENT_URL);

// // Middleware
// app.use(cors({
//   origin: CLIENT_URL,
//   credentials: true
// }));
// app.use(bodyParser.json());
// app.use(cookieParser());

// // Routes
// app.use('/api/auth', require('./routes/auth'));

// // Test Route
// app.get('/', (req, res) => {
//   res.send('Billing App API is running');
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

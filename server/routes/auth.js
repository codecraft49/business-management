const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const login = require('../controllers/login/login');
const verifyToken = require('../controllers/login/verify-token');
const AddUsers = require('../controllers/add users/add-users');
const getUsers = require('../controllers/add users/get-users');
const logout = require('../controllers/logout/logout');
const forgotPassword = require("../controllers/forgot-password/forgot-password");
const resetPassword = require("../controllers/forgot-password/reset-password");

// Register route
router.post('/login', login.login);
router.get('/verify-token', verifyToken.verifyToken);
router.post('/add-users', AddUsers.AddUsers);
router.get('/get-users', getUsers.getUsers);
router.post('/logout', logout.logout);
router.post('/forgot-password', forgotPassword.forgotPassword);
router.post('/reset-password', resetPassword.resetPassword);

module.exports = router;
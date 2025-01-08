const express = require('express');
const router = express.Router();
const userController = require('../controllers/User.controllers');


router.get('/users', userController.getAllUsers);
router.post('/users/signup', userController.signup);
router.get('/users/:id', userController.getUserById);

module.exports = router;

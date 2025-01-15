const express = require('express');
const router = express.Router();
const userController = require('../controllers/User.controllers');

router.get('/test', (req, res) => {
    res.send('Test route working');
  });
  
router.get('/users', userController.getAllUsers);
router.post('/users/login', userController.login)
router.post('/users/signup', userController.createUser);
router.get('/users/:id', userController.getUserById);




module.exports = router;

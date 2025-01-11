const express = require('express');
const router = express.Router();
const userController = require('../controllers/User.controllers');

router.get('/test', (req, res) => {
    res.send('Test route working');
  });
  
router.get('/users', userController.getAllUsers);
router.post('/users/signup', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.delete('/users/:id', userController.deleteUserById);




module.exports = router;

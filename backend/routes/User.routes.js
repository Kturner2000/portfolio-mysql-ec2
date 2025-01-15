const express = require('express');
const router = express.Router();
const userController = require('../controllers/User.controllers');
const protectRoute = require('../middleware/auth.middleware')

router.get('/test', (req, res) => {
    res.send('Test route working');
  });
  
router.get('/users', userController.getAllUsers);
router.post('/users/signup', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.get("/check", protectRoute, userController.checkAuth);




module.exports = router;

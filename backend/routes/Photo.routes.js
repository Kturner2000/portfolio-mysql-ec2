const express = require('express');
const router = express.Router();
const photoController = require('../controllers/Photo.controllers');

router.get('/test', (req, res) => {
    res.send('Test route working');
  });
  
router.get('/photos', photoController.getAllPhotos);
router.post('/photos/upload', photoController.uploadPhoto);
router.get('/category/:category', photoController.getPhotosByCategory)
router.get('/photos/:id', photoController.getPhotoById);




module.exports = router;

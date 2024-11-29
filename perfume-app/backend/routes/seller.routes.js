const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/seller.controller');

// CRUD Operations
router.post('/', sellerController.createSeller);
router.get('/', sellerController.getAllSellers);
router.get('/:id', sellerController.getSellerById);
router.put('/:id', sellerController.updateSeller);
router.delete('/:id', sellerController.deleteSeller);

module.exports = router;

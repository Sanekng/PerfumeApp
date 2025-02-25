const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/seller.controller');
const validateRequest = require('../middlewares/validateRequest');
const {createSellerSchema, updateSellerSchema} = require('../validators/sellers.validator');

// CRUD Operations
router.post('/', validateRequest(createSellerSchema), sellerController.createSeller);
router.get('/', sellerController.getAllSellers);
router.get('/:id', sellerController.getSellerById);
router.put('/:id', validateRequest(updateSellerSchema), sellerController.updateSeller);
router.delete('/:id', sellerController.deleteSeller);

module.exports = router;

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const validateRequest = require('../middlewares/validateRequest');
const {createOrderSchema, updateOrderSchema} = require('../validators/orders.validator');

// CRUD Operations
router.post('/', validateRequest(createOrderSchema), orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id', validateRequest(updateOrderSchema), orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;

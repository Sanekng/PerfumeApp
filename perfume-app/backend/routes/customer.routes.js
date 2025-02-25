const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');
const validateRequest = require('../middlewares/validateRequest');
const logActivity = require('../middlewares/activityLogger');
const {createCustomerSchema, updateCustomerSchema} = require('../validators/customers.validator');

// CRUD Operations
router.post('/', validateRequest(createCustomerSchema), customerController.createCustomer);
router.get('/', customerController.getAllCustomers);
router.get('/:id', customerController.getCustomerById);
router.put('/:id', validateRequest(updateCustomerSchema), customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;

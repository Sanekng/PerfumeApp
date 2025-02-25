const Customer = require('../models/customer.model');
const Order = require('../models/order.model');
const AppError = require('../utils/app.error');

// Create a new customer
exports.createCustomer = async (req, res, next) => {
    try {
        const customer = new Customer(req.body); // You might want to validate req.body first
        await customer.save();
        res.status(201).json({ data: customer, success: true });
    } catch (error) {
        next(error); // Pass the error to the error handler
    }
};

// Get all customers
exports.getAllCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.find(null, null, null).populate('orders');
        res.status(200).json({ data: customers, success: true });
    } catch (error) {
        next(error);
    }
};

// Get a single customer by ID
exports.getCustomerById = async (req, res, next) => {
    try {
        const customer = await Customer.findById(req.params.id, null, null).populate('orders');
        if (!customer) {
            return next(new AppError('Customer not found', 404));
        }
        res.status(200).json({ data: customer, success: true });
    } catch (error) {
        next(error);
    }
};

// Update a customer
exports.updateCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true, // Ensure validation rules are applied during update
        });
        if (!customer) {
            return next(new AppError('Customer not found', 404));
        }
        res.status(200).json({ data: customer, success: true });
    } catch (error) {
        next(error);
    }
};

// Delete a customer
exports.deleteCustomer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findByIdAndDelete(id, null);
        if (!customer) {
            return next(new AppError('Customer not found', 404));
        }
        // Delete related orders
        await Order.deleteMany({ customer: id });
        res.status(200).json({ message: "Customer Deleted", success: true}); // No Content
    } catch (error) {
        next(error);
    }
};

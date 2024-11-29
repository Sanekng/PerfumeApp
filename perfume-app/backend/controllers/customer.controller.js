const Customer = require('../models/customer.model');
const Order = require('../models/order.model');

// Create a new customer
exports.createCustomer = async (req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json({data: customer, success: true});
    } catch (error) {
        res.status(400).json({ error: error.message, success: false });
    }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().populate('orders');
        res.status(200).json({data: customers, success: true});
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
};

// Get a single customer by ID
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id).populate('orders');
        if (!customer) return res.status(404).json({ message: 'Customer not found', success: false });
        res.status(200).json({data:customer, success: true});
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!customer) return res.status(404).json({ message: 'Customer not found', success: false });
        res.status(200).json({data: customer, success: true});
    } catch (error) {
        res.status(400).json({ error: error.message, success: false });
    }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
    try {
        const {id}  = req.params;
        await Order.deleteMany({customer: id});
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) return res.status(404).json({ message: 'Customer not found', success: false });
        res.status(200).json({ message: 'Customer deleted', success: true });
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
};

const Order = require('../models/order.model');
const Perfume = require('../models/perfume.model');
const Customer = require('../models/customer.model');
const mongoose = require('mongoose');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { perfume, quantity, customer } = req.body;

        // Check if the perfume exists and has enough quantity
        const perfumeDoc = await Perfume.findById(perfume);
        if (!perfumeDoc) return res.status(404).json({ message: 'Perfume not found', success: false });
        if (perfumeDoc.quantity < quantity) return res.status(400).json({ message: 'Insufficient quantity', success: false });

        // Create the order
        const order = await Order.create(req.body); // Use `await` here

        // Update the customer's orders
        await Customer.findByIdAndUpdate(customer, { $push: { orders: order._id } });

        // Reduce the quantity of the perfume
        perfumeDoc.quantity -= quantity;
        await perfumeDoc.save();

        // Respond with the created order
        res.status(201).json({ data: order, success: true });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ error: error.message, success: false });
    }
};


// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('perfume customer');
        console.log(orders);
        res.status(200).json({ data: orders, success: true }); // Ensure `data` wraps the orders
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('perfume customer');
        if (!order) return res.status(404).json({ message: 'Order not found', success: false });
        res.status(200).json({data: order, success: true});
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
};

// Update an order
exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) return res.status(404).json({ message: 'Order not found', success: false });
        res.status(200).json({data: order, success: true});
    } catch (error) {
        res.status(400).json({ error: error.message, success: false });
    }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Order ID', success: false });
        }

        const order = await Order.findByIdAndDelete(id);
        if (!order) return res.status(404).json({ message: 'Order not found', success: false });

        res.status(200).json({ message: 'Order deleted', success: true });
    } catch (error) {
        console.error('Error deleting order:', error); // Log the error
        res.status(500).json({ error: error.message, success: false });
    }
};

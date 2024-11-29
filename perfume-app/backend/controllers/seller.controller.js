const Seller = require('../models/seller.model');

// Create a new seller
exports.createSeller = async (req, res) => {
    try {
        const seller = new Seller(req.body);
        await seller.save();
        res.status(201).json({data: seller, success: true});
    } catch (error) {
        res.status(400).json({ error: error.message, success: false });
    }
};

// Get all sellers
exports.getAllSellers = async (req, res) => {
    try {
        const sellers = await Seller.find();
        res.status(200).json({data: sellers, success: true});
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
};

// Get a single seller by ID
exports.getSellerById = async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.id);
        if (!seller) return res.status(404).json({ message: 'Seller not found', success: false });
        res.status(200).json({data: seller, success: true});
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
};

// Update a seller
exports.updateSeller = async (req, res) => {
    try {
        const seller = await Seller.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!seller) return res.status(404).json({ message: 'Seller not found', success: false });
        res.status(200).json({data: seller, success: true});
    } catch (error) {
        res.status(400).json({ error: error.message, success: false });
    }
};

// Delete a seller
exports.deleteSeller = async (req, res) => {
    try {
        const seller = await Seller.findByIdAndDelete(req.params.id);
        if (!seller) return res.status(404).json({ message: 'Seller not found', success: false });
        res.status(200).json({ message: 'Seller deleted', success: true });
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
};

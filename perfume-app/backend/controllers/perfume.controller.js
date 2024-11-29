const Perfume = require('../models/perfume.model');
const Order = require('../models/order.model');
const Seller = require('../models/seller.model');


// Create a new perfume
exports.createPerfume = async (req, res) => {
    try {
        const { name, price, quantity, description, image, sellerId } = req.body;

        // Validate seller
        const seller = await Seller.findById({id: sellerId}, null, null);
        if (!seller) return res.status(404).json({ message: 'Seller not found', success: false });

        const perfume = new Perfume({
            name,
            price,
            quantity,
            description,
            image,
            seller: sellerId,
        });

        await perfume.save();
        res.status(201).json({ data: perfume, success: true });
    } catch (error) {
        console.error('Error creating perfume:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};


// Get all perfumes
exports.getAllPerfumes = async (req, res) => {
    try {
        const perfumes = await Perfume.find(null, null, null).populate('seller orders');
        res.status(200).json({data: perfumes, success: true});
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
};

// Get a single perfume by ID
exports.getPerfumeById = async (req, res) => {
    try {
        const { id } = req.params;
        const perfume = await Perfume.findById(id, null, null).populate('seller'); // Ensure `seller` is populated
        if (!perfume) {
            return res.status(404).json({ message: 'Perfume not found', success: false });
        }
        res.status(200).json({ data: perfume, success: true });
    } catch (error) {
        console.error('Error fetching perfume by ID:', error); // Log the error
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};

// Update a perfume
exports.updatePerfume = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        // Validate perfume
        const perfume = await Perfume.findByIdAndUpdate({id}, {updatedData}, null );
        if (!perfume) {
            console.log('Perfume not found.');
            return res.status(404).json({ message: 'Perfume not found', success: false });
        }

        console.log('Perfume updated successfully:', perfume);
        res.status(200).json({ data: perfume, success: true });
    } catch (error) {
        console.error('Error updating perfume:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Delete a perfume
exports.deletePerfume = async (req, res) => {
    try {
        const { id } = req.params;

        // Check for existing orders
        const existingOrdersCount = await Order.countDocuments({ perfume: id });
        if (existingOrdersCount > 0) {
            console.log(`Perfume with ID ${id} has associated orders.`);
            return res.status(400).json({ message: 'Cannot delete perfume with associated orders', success: false });
        }

        const perfume = await Perfume.findByIdAndDelete(id,null);
        if (!perfume) {
            console.log(`Perfume with ID ${id} not found.`);
            return res.status(404).json({ message: 'Perfume not found', success: false });
        }

        res.status(200).json({ message: 'Perfume deleted', success: true });
    } catch (error) {
        console.error('Error deleting perfume:', error);  // Log the error
        res.status(500).json({ error: error.message, success: false });
    }
};
const mongoose = require('mongoose');

const perfumeSchema = new mongoose.Schema({
    name: { type: String, required: true, maxLength: 50 },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    quantity: { type: Number, required: true, default: 0 },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
}, { timestamps: true });

module.exports = mongoose.model('Perfume', perfumeSchema);

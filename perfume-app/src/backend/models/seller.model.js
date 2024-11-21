const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    name: { type: String, required: true, maxLength: 50 },
    surname: { type: String, required: true, maxLength: 50 },
    phone: { type: String, required: true },
    email: { type: String, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Seller', sellerSchema);

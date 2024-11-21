const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true, maxLength: 50 },
    surname: { type: String, required: true, maxLength: 50 },
    phone: { type: String, required: true },
    email: { type: String, unique: true },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);

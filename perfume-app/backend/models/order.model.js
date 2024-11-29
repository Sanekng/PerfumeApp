const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    perfume: { type: mongoose.Schema.Types.ObjectId, ref: 'Perfume', required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    quantity: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
}, { timestamps: true });

orderSchema.virtual('totalPrice').get(function() {
    return this.quantity * this.perfume.price;
});

module.exports = mongoose.model('Order', orderSchema);

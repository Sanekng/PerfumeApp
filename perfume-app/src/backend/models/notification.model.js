const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    message: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['sent', 'failed'], default: 'sent' }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);

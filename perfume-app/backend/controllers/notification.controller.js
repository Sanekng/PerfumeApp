const Notification = require('../models/notification.model');

// Create a new notification
exports.createNotification = async (req, res) => {
    try {
        const notification = await Notification.create(req.body);
        res.status(201).json({data: notification, success: true});
    } catch (error) {
        res.status(400).json({ error: error.message, success: false });
    }
};

// Get all notifications
exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find().populate('customer');
        res.status(200).json({data: notification, success: true});
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
};

// Get a single notification by ID
exports.getNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id).populate('customer');
        if (!notification) return res.status(404).json({ message: 'Notification not found', success: false });
        res.status(200).json({data: notification, success: true});
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
};

// Update a notification
exports.updateNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!notification) return res.status(404).json({ message: 'Notification not found', success: false });
        res.status(200).json({message: 'Notification updated successfully', success: true});
    } catch (error) {
        res.status(400).json({ error: error.message, success: false });
    }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        if (!notification) return res.status(404).json({ message: 'Notification not found', success: false });
        res.status(200).json({message: 'Notification deleted successfully', success: true});
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
};

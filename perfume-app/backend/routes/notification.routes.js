const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');

// CRUD Operations
router.post('/', notificationController.createNotification);
router.get('/', notificationController.getAllNotifications);
router.get('/:id', notificationController.getNotificationById);
router.put('/:id', notificationController.updateNotification);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;

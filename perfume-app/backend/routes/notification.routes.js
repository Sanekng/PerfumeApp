const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const validateRequest = require('../middlewares/validateRequest');
const {createNotificationSchema, updateNotificationSchema} = require('../validators/notifications.validator');

// CRUD Operations
router.post('/', validateRequest(createNotificationSchema), notificationController.createNotification);
router.get('/', notificationController.getAllNotifications);
router.get('/:id', notificationController.getNotificationById);
router.put('/:id', validateRequest(updateNotificationSchema), notificationController.updateNotification);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;

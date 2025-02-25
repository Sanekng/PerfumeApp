const Joi = require('joi');

const createNotificationSchema = Joi.object({
    customer: Joi.string().hex().length(24).required(),
    message: Joi.string().max(500).required(),
    sentAt: Joi.date(),
    status: Joi.string().valid('sent', 'failed'),
});

const updateNotificationSchema = Joi.object({
    message: Joi.string().max(500),
    sentAt: Joi.date(),
    status: Joi.string().valid('sent', 'failed'),
}).min(1);

module.exports = { createNotificationSchema, updateNotificationSchema };
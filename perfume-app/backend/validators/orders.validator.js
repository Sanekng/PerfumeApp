const Joi = require('joi');

const createOrderSchema = Joi.object({
    perfume: Joi.string().hex().length(24).required(),
    customer: Joi.string().hex().length(24).required(),
    quantity: Joi.number().positive().integer().required(),
    orderDate: Joi.date(),
});

const updateOrderSchema = Joi.object({
    perfume: Joi.string().hex().length(24),
    customer: Joi.string().hex().length(24),
    quantity: Joi.number().positive().integer(),
    orderDate: Joi.date(),
}).min(1);

module.exports = { createOrderSchema, updateOrderSchema };
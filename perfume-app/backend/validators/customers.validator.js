const Joi = require('joi');

const createCustomerSchema = Joi.object({
    name: Joi.string().max(50).required(),
    surname: Joi.string().max(50).required(),
    phone: Joi.string().pattern(/^\+?[0-9]{10,15}$/).required(),
    email: Joi.string().email().required(),
    orders: Joi.array().items(Joi.string().hex().length(24)),
});

const updateCustomerSchema = Joi.object({
    name: Joi.string().max(50),
    surname: Joi.string().max(50),
    phone: Joi.string().pattern(/^\+?[0-9]{10,15}$/),
    email: Joi.string().email(),
    orders: Joi.array().items(Joi.string().hex().length(24)),
}).min(1);

module.exports = { createCustomerSchema, updateCustomerSchema };

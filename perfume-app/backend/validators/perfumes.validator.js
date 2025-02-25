const Joi = require('joi');

const createPerfumeSchema = Joi.object({
    name: Joi.string().max(50).required(),
    price: Joi.number().positive().required(),
    description: Joi.string().allow(''),
    image: Joi.string().uri().allow(''),
    quantity: Joi.number().integer().min(0).required(),
    seller: Joi.string().hex().length(24).required(),
    orders: Joi.array().items(Joi.string().hex().length(24)),
});

const updatePerfumeSchema = Joi.object({
    name: Joi.string().max(50),
    price: Joi.number().positive(),
    description: Joi.string().allow(''),
    image: Joi.string().uri().allow(''),
    quantity: Joi.number().integer().min(0),
    seller: Joi.string().hex().length(24),
    orders: Joi.array().items(Joi.string().hex().length(24)),
}).min(1);

module.exports = { createPerfumeSchema, updatePerfumeSchema };
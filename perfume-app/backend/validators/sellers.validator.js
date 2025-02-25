const Joi = require('joi');

const updateSellerSchema = Joi.object({
    name: Joi.string().max(50),
    surname: Joi.string().max(50),
    phone: Joi.string().pattern(/^\+?[0-9]{10,15}$/),
    email: Joi.string().email(),
}).min(1);


const createSellerSchema = Joi.object({
    name: Joi.string().max(50).required(),
    surname: Joi.string().max(50).required(),
    phone: Joi.string().pattern(/^\+?[0-9]{10,15}$/).required(),
    email: Joi.string().email().required(),
});


module.exports = { createSellerSchema, updateSellerSchema };
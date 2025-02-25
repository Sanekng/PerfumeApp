const AppError = require('../utils/app.error');

const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {abortEarly: false});
        if (error) {
            const message = error.details.map((detail) => detail.message).join(', ');
            throw (new AppError(message, 404));
        }
        next();
    };
};

module.exports = validateRequest;
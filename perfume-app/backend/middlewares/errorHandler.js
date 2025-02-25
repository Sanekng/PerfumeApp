const AppError = require('../utils/app.error.js');

const errorHandler = (err, req, res, next) => {
    const isProduction = process.env.NODE_ENV === 'production';

    // Fallback for unknown errors
    let { statusCode, message, details } = err;
    statusCode = statusCode || 500;
    message = message || "Something went wrong";

    // Log error details (only for debugging)
    if (!isProduction) {
        console.error(err.stack);
    }

    // Standard response format
    res.status(statusCode).json({
        success: false,
        message,
        ...(details && { details }), // Include additional error details if available
        ...(isProduction ? {} : { stack: err.stack }) // Show stack only in development
    });
};

module.exports = errorHandler;

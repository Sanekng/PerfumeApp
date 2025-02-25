class AppError extends Error {
    constructor(message, statusCode, details = null) {
        super(message);
        this.statusCode = statusCode || 500;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
import Joi from 'joi';
import CustomErrorHandler from '../utils/custom-errorHandler.js';
import mongoose from 'mongoose';

const errorHanlderMiddleware = (err, req, res, next) => {
    let statusCode = err instanceof mongoose.Error ? 400 : 500;

    let data = {
        message: 'Internal server Error!',
        ...(process.env.DEBUG_MODE === 'true' && {
            originalError: err.message,
        }),
        ...(process.env.DEBUG_MODE === 'true' && {
            stack: err.stack,
        }),
    };

    if (err instanceof Joi.ValidationError) {
        statusCode = 422;
        data = {
            message: err.message,
        };
    }

    if (err instanceof CustomErrorHandler) {
        statusCode = err.status;
        data = {
            message: err.message,
        };
    }

    return res.status(statusCode).json(data);
};

export default errorHanlderMiddleware;

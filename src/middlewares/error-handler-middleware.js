import CustomErrorHandler from '../utils/custom-errorHandler';
import { ValidationError } from 'joi';

const errorHanlderMiddleware = (err, _, res, _) => {
    let statusCode = 500;
    let data = {
        message: 'Internal server Error!',
        ...(process.env.DEBUG_MODE === 'true' && {
            originalError: err.message,
        }),
    };

    if (err instanceof ValidationError) {
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

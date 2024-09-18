const errorHanlderMiddleware = (err, req, res, next) => {
    let statusCode = err.status || 500;
    let data = {
        message: 'Internal server Error!',
        ...(process.env.DEBUG_MODE === 'true' && {
            originalError: err.message,
        }),
    };

    return res.status(statusCode).json(data);
};

export default errorHanlderMiddleware;

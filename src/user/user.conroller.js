import ApiResponse from '../utils/api-response.js';

const register = (req, res, next) => {
    // res.json(req.body);
    try {
        throw new Error('explicitly returning error');
    } catch (error) {
        next(error);
    }
    // res.status(201).json(
    //     new ApiResponse(201, req.body, 'User created successfully')
    // );
};

export { register };

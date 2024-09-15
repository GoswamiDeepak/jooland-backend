import ApiResponse from '../utils/api-response.js';

const register = (req, res, next) => {
    // res.json(req.body);
    res.json(new ApiResponse(201, req.body, 'User created successfully', ));
};

export { register };

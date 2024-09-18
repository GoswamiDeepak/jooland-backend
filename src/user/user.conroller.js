import ApiResponse from '../utils/api-response.js';
import { registerSchema } from '../validators/user-validator.js';

const register = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        next(error);
    }
    try {
        // throw new Error('explicitly returning error');
    } catch (error) {
        next(error);
    }
};

export { register };

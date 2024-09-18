import ApiResponse from '../utils/api-response.js';
import CustomErrorHandler from '../utils/custom-errorHandler.js';
import { registerSchema } from '../validators/user-validator.js';
import { User } from './user.model.js';

const register = async (req, res, next) => {
    const { error } = registerSchema.validate(req.body); // request field validating
    if (error) {
        next(error);
    }
    const { username, email, password, role } = req.body;

    try {
        const isUser = await User.find({
            $or: [{ username: username }, { email: email }],
        });
        // console.log('isUser', isUser);

        //check username or email is already exist in our DB
        if (isUser.length > 0) {
            throw CustomErrorHandler.alreadyExist('user already exist!');
        }
    } catch (error) {
        next(error);
    }

    try {
        const user = await User.create({
            username: username,
            email: email,
            password: password,
            role: role && role,
        });
        res.status(201).json(new ApiResponse(201, user, 'You can log in now!'));
    } catch (error) {
        next(error);
    }
};

export { register };

import ApiResponse from '../utils/api-response.js';
import CustomErrorHandler from '../utils/custom-errorHandler.js';
import generateAccessAndRefreshToken from '../utils/generate-access&refreshtoken.js';
import { registerSchema, loginSchema } from '../validators/user-validator.js';
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

const login = async (req, res, next) => {
    const { error } = loginSchema.validate(req.body); // request field validating
    if (error) {
        next(error);
    }

    const { email, password } = req.body;

    try {
        const isUser = await User.findOne({ email: email }); //Find document by email

        if (!isUser) {
            throw CustomErrorHandler.unAuthorized(
                'user do not exist. Please Register then login!'
            );
        }

        const validatePassword = await isUser.isPasswordCheck(password); // check password is valid

        if (!validatePassword) {
            throw CustomErrorHandler.wrongCredentials('invalid credential!');
        }

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshToken(isUser); //generate accessToken & refresh Token 

        const data = {
            _id: isUser._id,
            username: isUser.username,
            email: isUser.email,
            role: isUser.role,
        };

        res.status(200).json(
            new ApiResponse(200, {
                ...data,
                accessToken,
                refreshToken,
            })
        );
    } catch (error) {
        next(error);
    }
};

export { register, login };

import jwt from 'jsonwebtoken';
import ApiResponse from '../utils/api-response.js';
import CustomErrorHandler from '../utils/custom-errorHandler.js';
import generateAccessAndRefreshToken from '../utils/generate-access&refreshtoken.js';
import { registerSchema, loginSchema } from '../validators/user-validator.js';
import { User } from './user.model.js';
import { options } from '../utils/cookie-option.js';

const register = async (req, res, next) => {
    const { error } = registerSchema.validate(req.body); // request field validating
    if (error) {
        next(error);
    }
    const { username, email, password, role } = req.body;

    try {
        const isUser = await User.findOne({
            $or: [{ username: username }, { email: email }],
        });

        //check username or email is already exist in our DB
        if (isUser) {
            return next(CustomErrorHandler.alreadyExist('user already exist!'));
        }
    } catch (error) {
        next(error);
    }

    try {
        await User.create({
            username: username,
            email: email,
            password: password,
            role: role && role,
        });

        res.status(201).json(
            new ApiResponse(201, {}, 'Registration Successfully!')
        );
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
            return next(
                CustomErrorHandler.wrongCredentials('Password is Invalid!')
            );
        }

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshToken(isUser); //generate accessToken & refresh Token

        const data = {
            _id: isUser._id,
            username: isUser.username,
            email: isUser.email,
            role: isUser.role,
        };

        return res
            .status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json(
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

const refreshAccessToken = async (req, res, next) => {
    const incomingRefreshToken =
        req?.cookies?.refreshToken || req?.body?.refreshToken; //refresh token from user


    if (!incomingRefreshToken) {
        return next(CustomErrorHandler.unAuthorized()); //if refresh token does not present
    }
    try {
        //jwt verifing refresh token
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken._id); //calling db call for to get user fields.

        if (!user) {
            return next(
                CustomErrorHandler.unAuthorized('Invalid refresh Token!')
            );
        }
        //maching the user's refresh token from api body refresh token
        if (incomingRefreshToken !== user.refreshToken) {
            return next(
                CustomErrorHandler.unAuthorized(
                    'Refresh token is expired or used!'
                )
            );
        }

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshToken(user);

        res.status(201)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json(
                new ApiResponse(
                    201,
                    { accessToken, refreshToken },
                    'Access Token refreshed.!'
                )
            );
    } catch (error) {
        next(error);
    }
};

const getUserDetail = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select(
            '-password -refreshToken -__v'
        );
        if (!user) {
            return next(CustomErrorHandler.unAuthorized('User not found'));
        }
        return res.status(200).json(new ApiResponse(200, user));
    } catch (error) {
        console.log(error);

        return next(error);
    }
};

const getSingleUser = async (req, res, next) => {
    try {
        let { id } = req.params;
        // id = objectId(id);

        const user = await User.findById(id).select(
            '-password -refreshToken -__v'
        );

        if (!user) {
            return next(CustomErrorHandler.notFound('User not found!'));
        }
        return res.status(200).json(new ApiResponse(200, user));
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return next(CustomErrorHandler.notFound('User not found'));
        }
        res.status(200).json(
            new ApiResponse(200, 'User deleted successfully!')
        );
    } catch (error) {
        next(error);
    }
};
const logoutUser = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(
            String(req.user._id),
            {
                $unset: {
                    refreshToken: 1,
                },
            },
            {
                new: true,
            }
        );
        return res
            .status(200)
            .clearCookie('accessToken', options)
            .clearCookie('refreshToken', options)
            .json(new ApiResponse(200, {}, 'user loged out!'));
    } catch (error) {
        next(error);
    }
};

export {
    register,
    login,
    getUserDetail,
    getSingleUser,
    deleteUser,
    refreshAccessToken,
    logoutUser,
};

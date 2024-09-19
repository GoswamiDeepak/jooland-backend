import jwt from 'jsonwebtoken';
import CustomErrorHandler from '../utils/custom-errorHandler.js';

export default function auth(req, res, next) {
    try {
        const token =
            req.cookies.accessToken ||
            req.header('Authorization')?.replace('Bearer ', ''); // req.headers.authorization.split(' ')[1];

        if (!token) {
            return next(CustomErrorHandler.unAuthorized());
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!decodedToken) {
            return next(CustomErrorHandler.unAuthorized());
        }
        req.user = {
            _id: decodedToken._id,
            username: decodedToken.username,
            email: decodedToken.email,
            role: decodedToken.role,
        };
        next();
    } catch (error) {
        return next(CustomErrorHandler.serverError(error.message));
    }
}

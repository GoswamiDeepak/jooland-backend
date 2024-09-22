import jwt from 'jsonwebtoken';
import CustomErrorHandler from '../utils/custom-errorHandler.js';

export default function auth(req, res, next) {
    try {
        const token =
            req?.cookies?.accessToken ||
            req.header('Authorization')?.replace('Bearer ', ''); // req.headers.authorization.split(' ')[1]
        // console.log('token :-', token);

        if (!token) {
            return next(CustomErrorHandler.unAuthorized());
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log('decodedToken :-', decodedToken);

        if (!decodedToken) {
            return next(CustomErrorHandler.unAuthorized());
        }

        req.user = {
            _id: decodedToken?._id,
            username: decodedToken?.username,
            email: decodedToken?.email,
            role: decodedToken?.role,
        };
        // console.log('req user', req.user);

        next();
    } catch (error) {
        console.log(error);

        // return next(CustomErrorHandler.serverError(error.message));
        // return next(CustomErrorHandler.serverError(error));
        // next(error);
    }
}

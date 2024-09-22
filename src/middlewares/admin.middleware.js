import CustomErrorHandler from '../utils/custom-errorHandler.js';

export default async function adminMiddleware(req, res, next) {
    if (req.user.role === 'admin') {
        next();
    } else {
        return next(CustomErrorHandler.accessDenied('Only admin can handle!'));
    }
}

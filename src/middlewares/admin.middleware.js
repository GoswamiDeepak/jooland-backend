import CustomErrorHandler from '../utils/custom-errorHandler';

export default async function adminMiddleware(req, res, next) {
    if (req.user.rol === 'admin') {
        next();
    } else {
        return next(CustomErrorHandler.unAuthorized('Only admin can handle!'));
    }
}

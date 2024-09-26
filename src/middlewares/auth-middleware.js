import jwt from 'jsonwebtoken';
import CustomErrorHandler from '../utils/custom-errorHandler.js';

export default function auth(req, res, next) {
    const token = req.cookies.accessToken; // or however you're extracting the token
    if (!token) {
        return next(new CustomErrorHandler.badRequest('Access token missing'));
    }
    try {
        // Verify the access token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = {
            // Save the decoded user data to req.user
            _id: decoded?._id,
            username: decoded?.username,
            email: decoded?.email,
            role: decoded?.role,
        };
        next(); // Proceed to the next middleware or controller
    } catch (error) {
        // Check for token expiration or invalid token
        if (error.name === 'TokenExpiredError') {
            return next(
                CustomErrorHandler.accessDenied('Access token expired')
            );
        }
        return next(error);
        // return res.status(403).json({ message: 'Invalid access token' });
    }
}

// const token = req.cookies.accessToken; // or however you're extracting the token

// if (!token) {
//     return res.status(401).json({ message: 'Access token missing' });
// }

// try {
//     // Verify the access token
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     req.user = decoded; // Save the decoded user data to req.user
//     next(); // Proceed to the next middleware or controller
// } catch (error) {
//     // Check for token expiration or invalid token
//     if (error.name === 'TokenExpiredError') {
//         return res.status(403).json({ message: 'Access token expired' });
//     }

//     return res.status(403).json({ message: 'Invalid access token' });
// }

// export default function auth(req, res, next) {
//     try {
//         const token =
//             req?.cookies?.accessToken ||
//             req.header('Authorization')?.replace('Bearer ', ''); // req.headers.authorization.split(' ')[1]

//         if (!token) {
//             return next(
//                 CustomErrorHandler.unAuthorized('token did not found!')
//             );
//         }

//         const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//         // if (!decodedToken) {
//         //     return next(
//         //         CustomErrorHandler.accessDenied('Invalid access token')
//         //     );
//         // }

//         req.user = {
//             _id: decodedToken?._id,
//             username: decodedToken?.username,
//             email: decodedToken?.email,
//             role: decodedToken?.role,
//         };

//         next();
//     } catch (error) {
//         // next(error);
//         // Check for token expiration or invalid token
//         if (error.name === 'TokenExpiredError') {
//             // return res.status(403).json({ message: 'Access token expired' });
//             return next(
//                 new CustomErrorHandler.accessDenied('Access token expired')
//             );
//         }
//         // return next(error);
//         // return res.status(403).json({ message: 'Invalid access token' });
//     }
// }

import express from 'express';
import {
    login,
    register,
    getUserDetail,
    getSingleUser,
    deleteUser,
    refreshAccessToken,
    logoutUser,
} from './user.conroller.js';

import auth from '../middlewares/auth-middleware.js';

import adminMiddleware from '../middlewares/admin.middleware.js';

const router = express.Router();

router.post('/user/register', register);
router.post('/user/login', login);
router.post('/user/refresh-token', refreshAccessToken);
router.get('/user', auth, getUserDetail);
router.get('/user/:id', auth, getSingleUser);
router.delete('/user/:id', auth, adminMiddleware, deleteUser);
router.post('/user/logout', auth, logoutUser);

export default router;

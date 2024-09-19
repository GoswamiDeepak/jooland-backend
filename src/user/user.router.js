import express from 'express';
import {
    login,
    register,
    getUserDetail,
    getSingleUser,
    deleteUser,
} from './user.conroller.js';
import auth from '../middlewares/auth-middleware.js';
import adminMiddleware from '../middlewares/admin.middleware.js';

const router = express.Router(); //Router method()

router.route('/user/register').post(register); // url/api/v1/user/register
router.route('/user/login').post(login);
router.route('/user').get(auth, getUserDetail);
router.route('/user/:id').get(auth, getSingleUser);
router.route('/user/:id').delete(auth, adminMiddleware, deleteUser); 

export default router;

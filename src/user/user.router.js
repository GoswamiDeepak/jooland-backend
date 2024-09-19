import express from 'express';
import {
    login,
    register,
    getUserDetail,
    getSingleUser,
} from './user.conroller.js';
import auth from '../middlewares/auth-middleware.js';

const router = express.Router(); //Router method()

router.route('/user/register').post(register); // url/api/v1/user/register
router.route('/user/login').post(login);
router.route('/user').get(auth, getUserDetail);
router.route('/user/:id').get(auth, getSingleUser);

export default router;

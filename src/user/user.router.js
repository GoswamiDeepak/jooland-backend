import express from 'express';
import { login, register } from './user.conroller.js';

const router = express.Router(); //Router method() 

router.route('/user/register').post(register);  // url/api/v1/user/register
router.route('/user/login').post(login)

export default router;

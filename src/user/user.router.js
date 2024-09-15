import express from 'express';
import { register } from './user.conroller.js';

const router = express.Router(); //Router method() 

router.route('/user/register').post(register);  // url/api/v1/user/register

export default router;

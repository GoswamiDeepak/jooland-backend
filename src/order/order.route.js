import express from 'express';
import { orderController } from './order.controller.js';
import auth from '../middlewares/auth-middleware.js';

const router = express.Router();

router.post('/order/create-order', auth, orderController.createOrder);

export default router;

import express from 'express';
import auth from '../middlewares/auth-middleware.js';
import { cartController } from './cart.controller.js';

const router = express.Router();

//create-cart
router.post('/cart/create-cart', cartController.createCart);

export default router;

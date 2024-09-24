import express from 'express';
import auth from '../middlewares/auth-middleware.js';
import { cartController } from './cart.controller.js';

const router = express.Router();

//create-cart
router.post('/cart/create-cart', auth, cartController.createCart);
router.get('/cart', auth, cartController.getAllCart);
router.patch('/cart/:id', auth, cartController.updateCart);
router.delete('/cart/:id', auth, cartController.deleteCart);

export default router;

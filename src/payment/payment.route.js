import express from 'express';
import { createPaymentStripe } from './payment.controller.js';
import auth from '../middlewares/auth-middleware.js';
const router = express.Router();

router.post('/payment/create-payment-stripe', auth, createPaymentStripe);

export default router;

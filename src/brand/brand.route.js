import express from 'express';
import auth from '../middlewares/auth-middleware.js';
import adminMiddleware from '../middlewares/admin.middleware.js';
import { brandController } from './brand.controller.js';

const router = express.Router();

router.use(auth, adminMiddleware);

router.route('/brand/create-brand').post(brandController.createBrand);

router.route('/brand').get(brandController.getBrand);

router
    .route('/brand/:id')
    .put(brandController.updateBrand)
    .delete(brandController.deleteBrand);

export default router;

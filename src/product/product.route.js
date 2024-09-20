import express from 'express';
import { productController } from './product.controller';
import auth from '../middlewares/auth-middleware';
import adminMiddleware from '../middlewares/admin.middleware';

const router = express.Router();

router
    .route('/product/create-product')
    .post(auth, adminMiddleware, productController.createProduct);

router.route('/product').get(productController.getProducts);

router
    .route('/product/:id')
    .get(productController.getSingleProduct)
    .patch(auth, adminMiddleware, productController.updateProduct)
    .delete(auth, adminMiddleware, productController.deleteProduct);

export default router;

import express from 'express';
import auth from '../middlewares/auth-middleware.js';
import adminMiddleware from '../middlewares/admin.middleware.js';
import { categoryController } from './category.controller.js';

const router = express.Router();

// router.use(auth, adminMiddleware);

router
    .route('/category/create-category')
    .post(categoryController.createCategory);

router.route('/category').get(categoryController.getCategory);

router
    .route('/category/:id')
    .put(categoryController.updateCategory)
    .delete(categoryController.deleteCategory);

export default router;

import ApiResponse from '../utils/api-response.js';
import { categorySchema } from '../validators/category-validator.js';
import { Category } from './category.model.js';

export const categoryController = {
    async createCategory(req, res, next) {
        const { error } = categorySchema.validate(req.body);
        if (error) {
            return next(error);
        }
        try {
            await Category.create(req.body);
            res.status(201).json(
                new ApiResponse(201, '', 'new category created')
            );
        } catch (error) {
            return next(error);
        }
    },
};

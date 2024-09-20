import ApiResponse from '../utils/api-response.js';
import CustomErrorHandler from '../utils/custom-errorHandler.js';
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

    async getCategory(req, res, next) {
        try {
            const category = await Category.find();
            res.status(200).json(
                new ApiResponse(200, category, 'all category')
            );
        } catch (error) {
            next(error);
        }
    },

    async updateCategory(req, res, next) {
        const { id } = req.params;
        const { error } = categorySchema.validate(req.body);
        if (error) {
            return next(error);
        }
        const { name } = req.body;
        try {
            const category = await Category.findByIdAndUpdate(
                id,
                { name },
                {
                    new: true,
                }
            );
            if (!category) {
                return next(
                    CustomErrorHandler.serverError('invalid category id!')
                );
            }
            res.status(200).json(
                new ApiResponse(200, category, 'category updated!')
            );
        } catch (error) {
            next(error);
        }
    },
    
    async deleteCategory(req, res, next) {
        const { id } = req.params;
        try {
            const isDeleted = await Category.findByIdAndDelete(id);
            if (!isDeleted) {
                return next(
                    CustomErrorHandler.serverError('invalid category id!')
                );
            }
            res.status(200).json(new ApiResponse(200, '', 'category deleted!'));
        } catch (error) {
            next(error);
        }
    },
};

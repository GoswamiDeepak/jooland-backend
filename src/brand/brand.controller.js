import ApiResponse from '../utils/api-response.js';
import CustomErrorHandler from '../utils/custom-errorHandler.js';
import { brandSchema } from '../validators/brand-validator.js';

import { Brand } from './brand.model.js';

export const brandController = {
    async createBrand(req, res, next) {
        const { error } = brandSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        try {
            await Brand.create(req.body);
            res.status(201).json(
                new ApiResponse(201, '', 'new category created')
            );
        } catch (error) {
            return next(error);
        }
    },

    async getBrand(req, res, next) {
        try {
            const category = await Brand.find();
            res.status(200).json(
                new ApiResponse(200, category, 'all category')
            );
        } catch (error) {
            next(error);
        }
    },

    async updateBrand(req, res, next) {
        const { id } = req.params;
        const { error } = brandSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        const { name } = req.body;
        try {
            const category = await Brand.findByIdAndUpdate(
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

    async deleteBrand(req, res, next) {
        const { id } = req.params;
        try {
            const isDeleted = await Brand.findByIdAndDelete(id);
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

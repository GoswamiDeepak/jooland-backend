import ApiResponse from '../utils/api-response.js';
import CustomErrorHandler from '../utils/custom-errorHandler.js';
import { productSchema } from '../validators/product-validator.js';
import { Product } from './product.model.js';

class ProductController {
    //create product method
    async createProduct(req, res, next) {
        const { error } = productSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        try {
            const product = await Product.create(req.body);
            if (!product) {
                return next(
                    CustomErrorHandler.serverError('Something went wrong.!')
                );
            }
            res.status(201).json(
                new ApiResponse(201, product, 'Product created!')
            );
        } catch (error) {
            next(error);
        }
    }
    //get all products
    async getProducts(req, res, next) {}
    //get single products
    async getSingleProduct(req, res, next) {
        const { id } = req.params;
        if (!id) {
            return next(
                CustomErrorHandler.badRequest(
                    'Please provide a valid product id'
                )
            );
        }
        try {
            const product = await Product.findById(id, { __v: 0 });
            if (!product) {
                return next(CustomErrorHandler.serverError());
            }
            return res
                .status(200)
                .json(new ApiResponse(200, product, 'product'));
        } catch (error) {
            next(error);
        }
    }
    async updateProduct(req, res, next) {
        const { id } = req.params;
    }
    //delete product
    async deleteProduct(req, res, next) {
        const { id } = req.params;
        if (!id) {
            return next(
                CustomErrorHandler.badRequest(
                    'Please provide a valid product id'
                )
            );
        }

        try {
            const product = await Product.findByIdAndDelete(id);
            if (!product) {
                return next(CustomErrorHandler.serverError());
            }
            res.status(200).json(
                new ApiResponse(200, '', 'prduct is deleted!')
            );
        } catch (error) {
            next(error);
        }
    }
}
export const productController = new ProductController();

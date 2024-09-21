import ApiResponse from '../utils/api-response.js';
import CustomErrorHandler from '../utils/custom-errorHandler.js';

class Product {
    async createProduct(req, res, next) {
        // console.log(req.body);
        res.json(req.body);
    }
    async getProducts(req, res, next) {}
    async getSingleProduct(req, res, next) {
        const { id } = req.params;
    }
    async updateProduct(req, res, next) {
        const { id } = req.params;
    }
    async deleteProduct(req, res, next) {
        const { id } = req.params;
    }
}
export const productController = new Product();

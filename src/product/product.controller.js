import ApiResponse from '../utils/api-response';
import CustomErrorHandler from '../utils/custom-errorHandler';

class Product {
    async createProduct(req, res, next) {}
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

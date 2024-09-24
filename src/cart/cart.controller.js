import ApiResponse from '../utils/api-response.js';
import CustomErrorHandler from '../utils/custom-errorHandler.js';
import { cartSchema } from '../validators/cart-validator.js';
import { Cart } from './cart.model.js';

export const cartController = {
    async createCart(req, res, next) {
        const { error } = cartSchema.validate();
        if (error) {
            next(error);
        }

        try {
            const cart = await Cart.create(req.body);

            if (!cart) {
                return CustomErrorHandler.serverError();
            }

            return res
                .status(201)
                .json(new ApiResponse(201, cart, 'cart is created!'));
        } catch (error) {
            next(error);
        }
    },
};

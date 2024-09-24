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
    async getAllCart(req, res, next) {
        try {
            const cart = await Cart.find();
            return res
                .status(200)
                .json(new ApiResponse(200, cart, 'all carts!'));
        } catch (error) {
            next(error);
        }
    },
    async updateCart(req, res, next) {
        const { id } = req.params;
        const { error } = cartSchema.validate(req.body);
        if (error) {
            next(error);
        }
        try {
            const cart = await Cart.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            return res
                .status(200)
                .json(new ApiResponse(200, cart, 'cart is updated.!'));
        } catch (error) {
            next(error);
        }
    },
    async deleteCart(req, res, next) {
        const { id } = req.params;
        try {
            await Cart.findByIdAndDelete(id);
            return res
                .status(200)
                .json(new ApiResponse(200, {}, 'cart deleted!'));
        } catch (error) {
            next(error);
        }
    },
};

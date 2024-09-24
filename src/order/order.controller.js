import { Cart } from '../cart/cart.model.js';

export const orderController = {
    async createOrder(req, res, next) {
        try {
            const cart = Cart.create(req.body);
            console.log(cart);
            res.json(cart);
        } catch (error) {
            next(error);
        }
    },
};

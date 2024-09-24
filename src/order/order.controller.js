import { populate } from 'dotenv';
import { Cart } from '../cart/cart.model.js';
import { Product } from '../product/product.model.js';
import { Order } from './order.model.js';
import CustomErrorHandler from '../utils/custom-errorHandler.js';

export const orderController = {
    async createOrder(req, res, next) {
        try {
            const order = new Order(req.body);

            let totalprice = 0;
            let totalquantity = 0;

            for (let key of order.cartItems) {
                const cart = await Cart.findById(key).populate('product');
                totalquantity += cart.quantity;
                totalprice += cart.product.price;
                const product = await Product.findById(cart.product._id);
                if (product.stock > 1) {
                    product.$inc('stock', -1 * cart.quantity);
                    await product.save();
                } else {
                    return next(
                        CustomErrorHandler.accessDenied(
                            'you can not order with this products'
                        )
                    );
                }
            }
            order.totalAmount = totalprice;
            order.totalQuantity = totalquantity;
            const newOrder = await order.save();
            const populatedOrder = await Order.findById(newOrder._id).populate({
                path: 'cartItems',
                populate: {
                    path: 'product',
                },
            });
            res.json(populatedOrder);
        } catch (error) {
            next(error);
        }
    },
};

import ApiResponse from '../utils/api-response.js';
import CustomErrorHandler from '../utils/custom-errorHandler.js';
import { cartSchema } from '../validators/cart-validator.js';
import { Cart } from './cart.model.js';

export const cartController = {
    async createCart(req, res, next) {
        const { error } = cartSchema.validate(req.body);
        if (error) {
            next(error);
        }
        const { quantity, product, colors, sizes } = req.body;

        try {
            const cart = await Cart.findOne({
                $and: [{ user: req.user._id }, { product: product }],
            });
            if (cart) {
                //product still in cart need to update
                const updatedCart = await Cart.findByIdAndUpdate(cart._id, {
                    $set: {
                        quantity: cart.quantity + quantity,
                        colors: colors,
                        sizes: sizes,
                    },
                });

                if (!updatedCart) {
                    return CustomErrorHandler.serverError();
                }

                return res
                    .status(201)
                    .json(
                        new ApiResponse(201, updatedCart, 'cart is updated!')
                    );
            } else {
                //new cart
                try {
                    const cart = await Cart.create({
                        product: product,
                        colors: colors,
                        sizes: sizes,
                        quantity: quantity,
                        user: req.user._id,
                    });

                    if (!cart) {
                        return CustomErrorHandler.serverError();
                    }

                    return res
                        .status(201)
                        .json(new ApiResponse(201, cart, 'cart is created!'));
                } catch (error) {
                    return next(error);
                }
            }
        } catch (error) {
            next(error);
        }
    },
    async getAllCart(req, res, next) {
        try {
            const cart = await Cart.find({ user: req.user._id });
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
            const cart = await Cart.findByIdAndUpdate(
                id,
                { ...req.body, user: req.user._id },
                {
                    new: true,
                }
            );

            //if cart is null mean wrong object id
            if (!cart) {
                console.log('inside cart error');

                return next(CustomErrorHandler.accessDenied('invalid cart Id'));
            }
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

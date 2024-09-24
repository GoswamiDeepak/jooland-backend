import { required } from 'joi';
import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
    {
        cartItems: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Cart',
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        totalAmount: {
            type: Number,
        },
        totalQuantity: {
            type: Number,
        },
        paymentMethod: {
            type: String,
            enum: {
                values: ['card', 'cash'],
                message: 'enum validator failed for ',
            },
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'sccessful'],
            default: 'pending',
        },
        orderStatus: {
            type: String,
            enum: ['pending', 'shipped', 'delivered'],
            default: 'pending',
        },
    },
    { timestamps: true }
);

export const Order = mongoose.model('Order', orderSchema);

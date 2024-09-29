import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema( 
    {
        quantity: {
            type: Number,
            required: true,
        },
        product: { 
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        sizes: {
            type: mongoose.Schema.Types.Mixed,
        },
        colors: {
            type: mongoose.Schema.Types.Mixed,
        },
    },
    { timestamps: true }
);

export const Cart = mongoose.model('Cart', cartSchema);

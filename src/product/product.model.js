import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            min: [1, 'price should be greater than 1'],
            max: [10000, 'price should be less than 10000'],
        },
        discoundPercentage: {
            type: Number,
            min: [1, 'price discound percentage should be greater than 1'],
            max: [99, 'price discound percentage should be less than 99'],
        },
        rating: {
            type: Number,
            min: [1, 'rating should be greater than 1'],
            max: [5, 'rating should be less than or equal to 5'],
            default: 0,
        },
        stock: {
            type: Number,
            min: [1, 'rating should be greater than 1'],
            max: [5, 'rating should be less than or equal to 5'],
            default: 0,
        },
        brand: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        images: {
            type: [String],
            required: true,
        },
        colors: {
            type: [mongoose.Schema.Types.Mixed],
        },
        sizes: {
            type: [mongoose.Schema.Types.Mixed],
        },
        highlights: {
            type: [Sting],
        },
        discountPrice: {
            type: Number,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

//virtual field
productSchema.virtual('discountPrice').get(function () {
    return price * (1 - discoundPercentage / 100);
});

export const Product = mongoose.model('Product', productSchema);

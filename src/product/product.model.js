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
            min: 0,
            max: [99, 'price discound percentage should be less than 99'],
            default: 0,
            required: false,
        },
        rating: {
            type: Number,
            min: 0,
            max: [5, 'rating should be less than or equal to 5'],
            default: 0,
            required: false,
        },
        stock: {
            type: Number,
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
            type: [String],
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


productSchema.pre('save', function (next) {
    this.discountPrice = this.price * (1 - this.discoundPercentage / 100);
    next();
});

export const Product = mongoose.model('Product', productSchema);

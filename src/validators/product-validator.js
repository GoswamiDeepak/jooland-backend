import Joi from 'joi';

export const productSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(5).required(),
    price: Joi.number().integer().min(1).required(),
    discountPercentage: Joi.number().min(1).max(99),
    rating: Joi.number().min(0).max(5),
    stock: Joi.number().integer().min(0).required(),
    brand: Joi.string().min(3).required(),
    category: Joi.string().min(3).required(),
    thumbnail: Joi.string().required(),
    images: Joi.array().items(Joi.string().min(1)).required(),
    colors: Joi.array().items(Joi.string().min(1)),
    sizes: Joi.array().items(Joi.string().min(1)),
    isActive: Joi.boolean(),
});

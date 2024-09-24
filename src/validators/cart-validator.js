import Joi from 'joi';

export const cartSchema = Joi.object({
    quantity: Joi.number().integer().required(),
    product: Joi.string().required(),
    sizes: Joi.string(),
    colors: Joi.string(),
});

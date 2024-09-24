import Joi from 'joi';

export const cartSchema = Joi.object({
    quantity: Joi.string().required(),
    product: Joi.string().required(),
    user: Joi.string().required(),
    sizes: Joi.string(),
    colors: Joi.string(),
});

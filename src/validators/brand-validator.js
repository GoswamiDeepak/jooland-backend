import Joi from 'joi';

export const brandSchema = Joi.object({
    name: Joi.string().min(3).required(),
});

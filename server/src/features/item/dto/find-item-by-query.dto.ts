import Joi from 'joi';

export type FindItemByQueryDto = {
    search: string;
    minPrice: number;
    maxPrice: number;
    page: number;
};

export const findItemByQueryValidationSchema = {
    search: Joi.string().max(255).default(''),
    minPrice: Joi.number().min(0).max(999999999).default(0),
    maxPrice: Joi.number().min(0).max(999999999).default(999999999),
    page: Joi.number().min(1).max(999999999).default(1),
};

export const findItemByQueryValidationObject = Joi.object(
    findItemByQueryValidationSchema
).required();

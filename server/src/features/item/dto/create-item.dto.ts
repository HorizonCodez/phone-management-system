import Joi from 'joi';

export type CreateItemDto = {
    title: string;
    description: string;
    availableStock: number;
    price: number;
};
export const createItemValidationSchema = {
    title: Joi.string().max(255).required(),
    description: Joi.string().max(1000).required(),
    availableStock: Joi.number().min(0).required(),
    price: Joi.number().min(0).required(),
};

export const createItemValidationObject = Joi.object(
    createItemValidationSchema
).required();

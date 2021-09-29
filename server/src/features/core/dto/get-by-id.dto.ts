import Joi from 'joi';

export type GetByIdDto = {
    id: number;
};

export const getByIdValidationSchema = {
    id: Joi.number().required(),
};

export const getByIdValidationObject = Joi.object(
    getByIdValidationSchema
).required();

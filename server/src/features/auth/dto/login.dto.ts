import Joi from 'joi';

export interface LoginDto {
    email: string;
    password: string;
}

export const loginValidationSchema = {
    email: Joi.string().required(),
    password: Joi.string().required(),
};

export const loginValidationObject = Joi.object(
    loginValidationSchema
).required();

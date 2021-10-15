import Joi from 'joi';

export interface RegisterDto {
    email: string;
    password: string;
}

export const registerValidationSchema = {
    email: Joi.string().lowercase().trim().min(3).max(1000).email().required(),
    password: Joi.string().min(4).max(64).required(),
};

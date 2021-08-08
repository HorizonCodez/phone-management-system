import Joi, { ValidationError } from 'joi';

export interface LoginDto {
    email: string;
    password: string;
}

const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
}).required();

export const validate = (
    data: unknown
): {
    error?: ValidationError;
    value: LoginDto;
} =>
    schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
    });

export default {
    validate,
};

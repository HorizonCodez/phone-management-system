import Joi, { ValidationError } from 'joi';

export type ValidationDto = {
    data: unknown;
    schema: Joi.AnySchema;
};

export default function validate<T>({ schema, data }: ValidationDto): {
    error?: ValidationError;
    value: T;
} {
    return schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
    });
}

import Joi from 'joi';
import {
    RegisterDto,
    registerValidationSchema,
} from '../../auth/dto/register.dto';

export type PhoneShopRegisterDto = RegisterDto & {
    shopName: string;
    address: string;
    phone: string;
    brNumber: string;
};

export const phoneShopRegisterValidationSchema = {
    ...registerValidationSchema,
    shopName: Joi.string().max(1000).required(),
    address: Joi.string().max(1000).required(),
    phone: Joi.string().max(15).required(),
    brNumber: Joi.string().required(),
};

export const phoneShopRegisterValidationObject = Joi.object(
    phoneShopRegisterValidationSchema
).required();

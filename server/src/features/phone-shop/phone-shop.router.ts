import { Router } from 'express';
import { HttpValidationError } from '../../lib/http-validation-error';
import validate from '../../lib/validate';
import {
    PhoneShopRegisterDto,
    phoneShopRegisterValidationObject,
} from './dto/phone-shop-register.dto';
import phoneShopService from './phone-shop.service';

const router = Router();

router.post('/register', async (req, res, next) => {
    const { error, value } = validate<PhoneShopRegisterDto>({
        data: req.body,
        schema: phoneShopRegisterValidationObject,
    });

    if (error) {
        return next(new HttpValidationError(error));
    }

    try {
        return res.status(200).json(await phoneShopService.register(value));
    } catch (e) {
        return next(e);
    }
});

export default router;

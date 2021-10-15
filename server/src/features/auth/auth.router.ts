import { Router } from 'express';
import { LoginDto, loginValidationObject } from './dto/login.dto';
import { HttpValidationError } from '../../lib/http-validation-error';
import authService from './auth.service';
import validate from '../../lib/validate';

const router = Router();

router.post('/login', async (req, res, next) => {
    const { error, value } = validate<LoginDto>({
        data: req.body,
        schema: loginValidationObject,
    });

    if (error) {
        return next(new HttpValidationError(error));
    }

    try {
        return res.status(200).json(await authService.login(req, value));
    } catch (e) {
        return next(e);
    }
});

export default router;

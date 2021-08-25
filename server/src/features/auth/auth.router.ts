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
        req.session.user = await authService.login(value);
        return res.status(200).send();
    } catch (e) {
        return next(e);
    }
});

export default router;

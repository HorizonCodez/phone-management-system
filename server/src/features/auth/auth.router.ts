import { Router } from 'express';
import LoginDto from './dto/login.dto';
import { HttpValidationError } from '../../lib/http-validation-error';
import authService from './auth.service';

const router = Router();

router.post('/login', async (req, res, next) => {
    const { error, value } = LoginDto.validate(req.body);

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

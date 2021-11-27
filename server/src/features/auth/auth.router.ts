import { Router } from 'express';
import { LoginDto, loginValidationObject } from './dto/login.dto';
import { HttpValidationError } from '../../lib/http-validation-error';
import authService from './auth.service';
import validate from '../../lib/validate';
import { authGuard } from './auth.guard';

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

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {});
    return res.status(201).json({ message: 'Logged out' });
});

router.get(
    '/profile',
    authGuard(['Shop', 'Moderator', 'Admin']),
    async (req, res, next) => {
        if (!req.session.user) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }
        try {
            return res
                .status(200)
                .json(await authService.getProfile(req.session.user));
        } catch (e) {
            return next(e);
        }
    }
);

export default router;

import { Router } from 'express';
import { HttpValidationError } from '../../lib/http-validation-error';
import validate from '../../lib/validate';
import {
    PhoneShopRegisterDto,
    phoneShopRegisterValidationObject,
} from './dto/phone-shop-register.dto';
import phoneShopService from './phone-shop.service';
import { imageUpload } from '../../lib/local-image-upload';
import { HttpError } from '../../lib/http-error';
import { GetByIdDto, getByIdValidationObject } from '../core/dto/get-by-id.dto';
import authService from '../auth/auth.service';
import { authGuard } from '../auth/auth.guard';

const router = Router();

/** register a phone shop **/
router.post(
    '/register',
    imageUpload.fields([
        { name: 'profileImage', maxCount: 1 },
        { name: 'brImage', maxCount: 1 },
    ]),
    async (req, res, next) => {
        const { error, value } = validate<PhoneShopRegisterDto>({
            data: req.body,
            schema: phoneShopRegisterValidationObject,
        });

        if (error) {
            return next(new HttpValidationError(error));
        }

        /** checking images for errors **/
        // validate images
        if (
            !req.files['profileImage'] ||
            !Array.isArray(req.files['profileImage'])
        ) {
            return next(new HttpError(400, 'Invalid profileImage'));
        }
        if (!req.files['brImage'] || !Array.isArray(req.files['brImage'])) {
            return next(new HttpError(400, 'Invalid brImage'));
        }

        const profileImageBuffer = req.files['profileImage'][0]?.buffer;
        const brBuffer = req.files['brImage'][0]?.buffer;

        try {
            const shop = await phoneShopService.register(value, {
                profileImage: profileImageBuffer,
                br: brBuffer,
            });

            /** automatically sign in the user **/
            await authService.login(req, {
                email: value.email,
                password: value.password,
            });

            return res.status(200).json(shop);
        } catch (e) {
            return next(e);
        }
    }
);

/** find a shop by id **/
router.get('/:id', async (req, res, next) => {
    const { error, value } = validate<GetByIdDto>({
        data: req.params,
        schema: getByIdValidationObject,
    });

    if (error) {
        return next(new HttpValidationError(error));
    }
    try {
        return res.json(
            await phoneShopService.findById(value, req.session.user)
        );
    } catch (e) {
        return next(e);
    }
});

/**
 * Verify a shop as admin
 */
router.put(
    '/verify/:id',
    authGuard(['Moderator', 'Admin']),
    async (req, res, next) => {
        const { error, value } = validate<GetByIdDto>({
            data: req.params,
            schema: getByIdValidationObject,
        });
        if (error) {
            return next(new HttpValidationError(error));
        }
        try {
            return res.json(await phoneShopService.approveShop(value));
        } catch (e) {
            next(e);
        }
    }
);

export default router;

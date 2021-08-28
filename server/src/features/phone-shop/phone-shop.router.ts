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

const router = Router();

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
        // @ts-ignore
        if (!req.files.profileImage || !Array.isArray(req.files.profileImage)) {
            return next(new HttpError(400, 'Invalid profileImage'));
        }
        // @ts-ignore
        if (!req.files.brImage || !Array.isArray(req.files.brImage)) {
            return next(new HttpError(400, 'Invalid brImage'));
        }

        // @ts-ignore
        const profileImageBuffer = req.files.profileImage[0]?.buffer;
        // @ts-ignore
        const brBuffer = req.files.brImage[0]?.buffer;

        try {
            return res.status(200).json(
                await phoneShopService.register(value, {
                    profileImage: profileImageBuffer,
                    br: brBuffer,
                })
            );
        } catch (e) {
            return next(e);
        }
    }
);

export default router;

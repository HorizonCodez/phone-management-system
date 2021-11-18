import { Router } from 'express';
import { authGuard } from '../auth/auth.guard';
import validate from '../../lib/validate';
import {
    CreateItemDto,
    createItemValidationObject,
} from './dto/create-item.dto';
import { HttpValidationError } from '../../lib/http-validation-error';
import itemService from './item.service';
import { imageUpload } from '../../lib/local-image-upload';
import { HttpError } from '../../lib/http-error';
import { GetByIdDto, getByIdValidationObject } from '../core/dto/get-by-id.dto';
import {
    FindItemByQueryDto,
    findItemByQueryValidationObject,
} from './dto/find-item-by-query.dto';

const router = Router();

/**
 * Create a new item
 */
router.post(
    '/create',
    authGuard(['Shop', 'Moderator', 'Admin']),
    imageUpload.array('images', 5),
    async (req, res, next) => {
        const { error, value } = validate<CreateItemDto>({
            data: req.body,
            schema: createItemValidationObject,
        });

        if (error) {
            return next(new HttpValidationError(error));
        }

        console.log(req.files);
        /** checking images for errors **/
        // validate images
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return next(new HttpError(400, 'Item Images required'));
        }

        try {
            return res.json(
                await itemService.addItem(req.session.user, value, req.files)
            );
        } catch (e) {
            return next(e);
        }
    }
);

/** get item by id **/
router.get('/:id', async (req, res, next) => {
    const { error, value } = validate<GetByIdDto>({
        data: req.params,
        schema: getByIdValidationObject,
    });

    if (error) {
        return next(new HttpValidationError(error));
    }

    try {
        return res.json(await itemService.findById(value.id));
    } catch (e) {
        next(e);
    }
});

/** find items by query paginated **/
router.get('/', async (req, res, next) => {
    const { error, value } = validate<FindItemByQueryDto>({
        data: req.query,
        schema: findItemByQueryValidationObject,
    });

    if (error) {
        return next(new HttpValidationError(error));
    }

    try {
        return res.json(await itemService.findByQuery(value));
    } catch (e) {
        next(e);
    }
});

export default router;

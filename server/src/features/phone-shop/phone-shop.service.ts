import { PhoneShopRegisterDto } from './dto/phone-shop-register.dto';
import prisma from '../../lib/prisma';
import authService from '../auth/auth.service';
import { HttpError } from '../../lib/http-error';
import imageService from '../image/image.service';
import { GetByIdDto } from '../core/dto/get-by-id.dto';
import { PhoneShop } from '@prisma/client';
import { AuthUser } from '../auth/auth.types';

const DEFAULT_SHOP_AVATAR =
    'https://res.cloudinary.com/mobi-market/image/upload/c_scale,w_80/v1630226499/defaults/shops_zzuccr.png';

async function register(
    data: PhoneShopRegisterDto,
    images: { profileImage: unknown; br: unknown }
) {
    // make sure city id is valid
    // todo: make a separate method on city feature
    const city = await prisma.city.findUnique({
        where: {
            id: data.cityId,
        },
    });
    if (!city) {
        throw new HttpError(404, 'Invalid city id', 'CityNotFound');
    }

    const phoneShop = await prisma.$transaction(async (prisma) => {
        /** create app user **/
        const user = await authService.register(
            {
                email: data.email,
                password: data.password,
            },
            'Shop',
            // @ts-ignore
            prisma
        );

        /** create images **/
        const profileImage = await imageService.create(
            DEFAULT_SHOP_AVATAR,
            'Profile',
            // @ts-ignore
            prisma
        );
        const brImage = await imageService.create(
            'empty',
            'BR',
            // @ts-ignore
            prisma
        );

        /** create phone shop in database **/
        return prisma.phoneShop.create({
            data: {
                userId: user.id,
                shopName: data.shopName,
                address: data.address,
                phone: data.phone,
                isVerified: false,
                cityId: data.cityId,
                brImageId: brImage.id,
                profileImageId: profileImage.id,
            },
        });
    });
    /** upload images **/
    // add profile image
    const uploadedProfileImage: any = await imageService.uploadImage(
        images.profileImage,
        'Profile'
    );

    // add br image
    const uploadedBrImage: any = await imageService.uploadImage(
        images.br,
        'BR'
    );

    /** update images **/
    await prisma.image.update({
        where: {
            id: phoneShop.profileImageId,
        },
        data: {
            url: uploadedProfileImage.secure_url,
        },
    });

    await prisma.image.update({
        where: {
            id: phoneShop.brImageId,
        },
        data: {
            url: uploadedBrImage.secure_url,
        },
    });

    return findById({ id: phoneShop.id }, null, true);
}

/**
 * Check if the current user has permission to view this shop or not.
 * any user can see approved shops.
 * only admins and the shop owner can see the shops that are still in review process
 * @param shop phone shop object
 * @param user current user
 * @param ignorePermissions ignore all permission checks if true
 */
function _verifyViewPermissions(
    shop: PhoneShop,
    user: AuthUser,
    ignorePermissions: boolean
): boolean {
    if (
        shop.isVerified ||
        ignorePermissions ||
        user?.type === 'Admin' ||
        user?.type === 'Moderator' ||
        user?.id === shop.userId
    ) {
        return true;
    }

    throw new HttpError(403, 'You dont have permission to view this shop');
}

/**
 * Find a shop by the given id
 * @param data object with property id inside
 * @param user current user
 * @param ignorePermissions ignore all permission checks if true
 */
async function findById(
    data: GetByIdDto,
    user?: AuthUser,
    ignorePermissions: boolean = false
) {
    const includeObject: any = {
        appUser: {
            select: {
                email: true,
                type: true,
            },
        },
        city: true,
        profileImage: true,
    };
    if (user?.type === 'Admin' || user?.type === 'Moderator') {
        includeObject.brImage = true;
    }

    const shop = await prisma.phoneShop.findUnique({
        where: {
            id: data.id,
        },
        include: includeObject,
    });

    /** throw error if shop does not exists **/
    if (!shop) {
        throw new HttpError(404, 'Phone shop not found');
    }

    /** check view permissions **/
    _verifyViewPermissions(shop, user, ignorePermissions);
    return shop;
}

/**
 * Approve a shop as  admin
 */
async function approveShop(data: GetByIdDto) {
    return prisma.phoneShop.update({
        where: {
            id: data.id,
        },
        data: {
            isVerified: true,
        },
    });
}

export default {
    register,
    findById,
    approveShop,
};

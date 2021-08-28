import { PhoneShopRegisterDto } from './dto/phone-shop-register.dto';
import prisma from '../../lib/prisma';
import authService from '../auth/auth.service';
import { HttpError } from '../../lib/http-error';
import imageService from '../image/image.service';

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

    return await prisma.$transaction(async (prisma) => {
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
            uploadedProfileImage.secure_url,
            'Profile',
            // @ts-ignore
            prisma
        );
        const brImage = await imageService.create(
            uploadedBrImage.secure_url,
            'BR',
            // @ts-ignore
            prisma
        );

        /** create br **/
        const br = await prisma.businessRegistration.create({
            data: {
                imgId: brImage.id,
                registrationNumber: data.brNumber,
            },
        });

        /** create phone shop in database **/
        return prisma.phoneShop.create({
            data: {
                userId: user.id,
                shopName: data.shopName,
                address: data.address,
                phone: data.phone,
                isVerified: false,
                cityId: data.cityId,
                brId: br.id,
                profileImageId: profileImage.id,
            },
        });
    });
}

export default {
    register,
};

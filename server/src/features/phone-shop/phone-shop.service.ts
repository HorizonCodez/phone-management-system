import { PhoneShopRegisterDto } from './dto/phone-shop-register.dto';
import prisma from '../../lib/prisma';
import authService from '../auth/auth.service';
import { HttpError } from '../../lib/http-error';

async function register(data: PhoneShopRegisterDto) {
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

    // create app user
    const user = await authService.register(
        {
            email: data.email,
            password: data.password,
        },
        'Shop'
    );

    // create phone shop in database
    await prisma.phoneShop.create({
        data: {
            userId: user.id,
            shopName: data.shopName,
            address: data.address,
            phone: data.phone,
            isVerified: false,
            brId: 100,
            cityId: 100,
            profileImageId: 100,
            coverImageId: 100,
        },
    });
}

export default {
    register,
};

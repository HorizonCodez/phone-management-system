import { LoginDto } from './dto/login.dto';
import bcrypt from 'bcrypt';
import prisma from '../../lib/prisma';
import { HttpError } from '../../lib/http-error';
import { LoginResDto } from './dto/login-res.dto';
import { RegisterDto } from './dto/register.dto';
import { AppUser, UserType } from '@prisma/client';

async function login(req, data: LoginDto): Promise<LoginResDto> {
    // fetch user
    const user = await prisma.appUser.findUnique({
        where: {
            email: data.email,
        },
    });

    // check user and the password
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
        throw new HttpError(400, 'Invalid email or password');
    }

    req.session.user = {
        id: user.id,
        type: user.type,
    };
    return {
        id: user.id,
        type: user.type,
    };
}

async function checkExists(email: string): Promise<boolean> {
    const user = await prisma.appUser.findUnique({
        where: {
            email,
        },
    });

    return !!user;
}

async function register(
    data: RegisterDto,
    type: UserType,
    prismaClient = prisma
): Promise<AppUser> {
    // make sure email is unique
    const existingAppUser = await checkExists(data.email);
    // throw error if user already exists
    if (existingAppUser) {
        throw new HttpError(400, 'Email already exists', 'EmailExists');
    }

    // encrypt password
    const encryptedPW = await bcrypt.hash(data.password, 10);

    return prismaClient.appUser.create({
        data: {
            email: data.email,
            password: encryptedPW,
            type,
        },
    });
}

async function getProfile(user: { id: number; type: UserType }): Promise<any> {
    const { phoneShop, customer, siteModerator, ...result } =
        await prisma.appUser.findUnique({
            where: {
                id: user.id,
            },
            select: {
                id: true,
                email: true,
                type: true,
                customer: {
                    include: {
                        profileImage: true,
                    },
                },
                phoneShop: {
                    include: {
                        profileImage: true,
                    },
                },
                siteModerator: {
                    include: {
                        profileImage: true,
                    },
                },
            },
        });

    switch (user.type) {
        case UserType.Customer:
            return {
                ...result,
                profile: customer,
            };
        case UserType.Shop:
            return {
                ...result,
                profile: phoneShop,
            };
        case UserType.Moderator:
            return {
                ...result,
                profile: siteModerator,
            };
    }
}

export default {
    login,
    register,
    checkExists,
    getProfile,
};

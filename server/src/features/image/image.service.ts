import { ImageType, PrismaClient } from '@prisma/client';
import prisma from '../../lib/prisma';

import { getImageConfig } from './image.config';
import { cloudinaryUpload } from '../../lib/cloudinary-upload';

async function uploadImage(image: unknown, type: ImageType) {
    return cloudinaryUpload(image, getImageConfig(type));
}

async function create(
    url: string,
    type: ImageType,
    prismaClient: PrismaClient = prisma
) {
    return prismaClient.image.create({
        data: {
            url,
            type: type,
        },
    });
}

export default {
    create,
    uploadImage,
};

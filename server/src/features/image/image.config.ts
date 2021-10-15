import { ImageType } from '@prisma/client';

export const getImageConfig = (imageType: ImageType) => {
    switch (imageType) {
        case 'Profile':
            return {
                folder: 'avatars',
                transformation: [{ width: 80, height: 80, crop: 'scale' }],
            };
        case 'BR':
            return {
                folder: 'br',
            };
        case 'Item':
            return {
                folder: 'items',
                transformation: [{ width: 500, height: 500, crop: 'scale' }],
            };
        default:
            return {};
    }
};

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
        default:
            return {};
    }
};

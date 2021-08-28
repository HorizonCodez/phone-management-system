import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

export const cloudinaryUpload = (file: any, config) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                discard_original_filename: true,
                unique_filename: true,
                ...config,
            },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );

        streamifier.createReadStream(file).pipe(stream);
    });
};

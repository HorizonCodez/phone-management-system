import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

export const cloudinaryUpload = async (file: any, config) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                discard_original_filename: true,
                unique_filename: true,
                async: true,
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
        fs.createReadStream(file).pipe(stream);
    });
};

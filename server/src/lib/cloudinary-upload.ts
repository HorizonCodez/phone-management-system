import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

export const cloudinaryUpload = async (file: any, config) => {
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
        const readableStream = new Readable({
            read() {},
        }).pipe(stream);
        readableStream.push(file);
        readableStream.end();
    });
};

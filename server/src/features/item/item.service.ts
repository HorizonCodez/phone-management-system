import prisma from '../../lib/prisma';
import { AuthUser } from '../auth/auth.types';
import imageService from '../image/image.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemImage } from '@prisma/client';
import { FindItemByQueryDto } from './dto/find-item-by-query.dto';
import { ITEMS_PER_PAGE } from '../../config';

async function addItem(user: AuthUser, data: CreateItemDto, images: any[]) {
    const { item, itemImages } = await prisma.$transaction(async (prisma) => {
        /** create item **/
        const item = await prisma.item.create({
            data: {
                availableStock: data.availableStock,
                title: data.title,
                description: data.description,
                price: data.price,
                shopId: user.id,
            },
        });

        const itemImages: ItemImage[] = [];
        /** create images **/
        for (let i = 0; i < images.length; i++) {
            const itemImage = await prisma.itemImage.create({
                data: {
                    image: {
                        create: {
                            url: 'empty',
                            type: 'Item',
                        },
                    },
                    imageIndex: i,
                    item: {
                        connect: {
                            id: item.id,
                        },
                    },
                },
            });

            itemImages.push(itemImage);
        }

        return { item, itemImages };
    });

    /** Upload images **/
    for (let i = 0; i < itemImages.length; i++) {
        const uploadedImage: any = await imageService.uploadImage(
            images[i].buffer,
            'Item'
        );

        /** update images **/
        await prisma.image.update({
            where: {
                id: itemImages[i].imageId,
            },
            data: {
                url: uploadedImage.secure_url,
            },
        });
    }

    return findById(item.id);
}

async function findById(id: number) {
    return prisma.item.findUnique({
        where: {
            id,
        },
        include: {
            itemImages: {
                select: {
                    image: true,
                },
            },
            reviews: true,
            phoneShop: {
                select: {
                    shopName: true,
                    phone: true,
                    profileImage: true,
                },
            },
        },
    });
}

async function findByQuery(query: FindItemByQueryDto) {
    return prisma.item.findMany({
        where: {
            price: {
                gte: query.minPrice,
                lte: query.maxPrice,
            },
            OR: [
                {
                    title: {
                        contains: query.search,
                    },
                },
                {
                    description: {
                        contains: query.search,
                    },
                },
            ],
        },
        include: {
            itemImages: {
                select: {
                    image: true,
                },
            },
            reviews: true,
            phoneShop: {
                select: {
                    shopName: true,
                },
            },
        },
        skip: (query.page - 1) * ITEMS_PER_PAGE,
        take: ITEMS_PER_PAGE,
    });
}

async function getShopItems(shopId: number) {
    return prisma.item.findMany({
        where: {
            shopId,
        },
        include: {
            itemImages: {
                select: {
                    image: true,
                },
            },
        },
    });
}

export default {
    addItem,
    findById,
    findByQuery,
    getShopItems,
};

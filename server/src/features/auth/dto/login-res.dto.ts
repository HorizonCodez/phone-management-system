import { UserType } from '@prisma/client';

export type LoginResDto = {
    id: number;
    type: UserType;
};

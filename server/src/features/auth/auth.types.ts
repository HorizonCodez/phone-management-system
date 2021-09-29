import { UserType } from '@prisma/client';

export type AuthUser = {
    id: number;
    type: UserType;
};

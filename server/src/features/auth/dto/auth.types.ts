import { UserType } from '@prisma/client';

export type AuthUser = {
    id: number;
    type: UserType;
};

export type AuthUserWithPermission =
    | (AuthUser & {
          ignorePermissions: false;
      })
    | {
          ignorePermissions: true;
      };

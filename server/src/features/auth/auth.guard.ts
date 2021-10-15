import { UserType } from '@prisma/client';
import { HttpError } from '../../lib/http-error';

export function authGuard(roles?: UserType[]) {
    return (req, res, next) => {
        if (!req.session.user) {
            return next(new HttpError(401, 'Unauthorized'));
        } else {
            // handle routes that have no specific route
            if (!roles) {
                return next();
            }
            // check the access roles
            if (roles.includes(req.session.user.type)) {
                return next();
            }
            return next(new HttpError(401, 'Unauthorized'));
        }
    };
}

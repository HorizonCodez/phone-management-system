import express, { json, urlencoded } from 'express';
import logger from './utils/logger';
import { httpLogger } from './middlewares/http-logger';
import { HttpError } from './lib/http-error';
import router from './router';
import session from 'express-session';
import { SESSION_MAX_AGE, SESSION_SECRET } from './config';
import { UserType } from '@prisma/client';

const app = express();

/* apply middleware */
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(httpLogger);

// configure express session
app.use(
    session({
        secret: SESSION_SECRET,
        name: 'pos_sid',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: SESSION_MAX_AGE,
        },
    })
);

// define user object in express session
declare module 'express-session' {
    interface SessionData {
        user?: {
            id: number;
            type: UserType;
        };
    }
}

// use router
app.use(router);

//error handler
app.use((err, req, res, _next) => {
    if (err instanceof HttpError) {
        res.status(err.status).send(err.toJSON());
    } else if (err.status) {
        res.status(err.status).send(
            new HttpError(err.status, err.message).toJSON()
        );
    } else {
        logger.error(err.message);
        res.status(500).send(
            process.env.NODE_ENV !== 'production'
                ? err
                : 'Internal Server Error'
        );
    }
});

export default app;

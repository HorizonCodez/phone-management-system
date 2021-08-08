import app from './app';
import { PORT } from './config';
import logger from './utils/logger';
import prisma from './lib/prisma';

const startServer = async () => {
    //initialize prisma
    prisma.$connect();

    //start listening
    app.listen(PORT, async () => {
        logger.info(`app started on port ${PORT}`);
    });
};

startServer().catch((err) => {
    logger.error(err);
});

import morgan, { StreamOptions } from 'morgan';
import logger from '../utils/logger';

const stream: StreamOptions = {
    write: (message) => logger.info(message),
};

export const httpLogger = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    { stream }
);

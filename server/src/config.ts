import dotenv from 'dotenv';

dotenv.config();

let _databaseURL, _logFile;
switch (process.env.NODE_ENV) {
    case 'production':
        _databaseURL = process.env.DATABASE_URL;
        _logFile = 'log.log';
        break;
    case 'test':
        _databaseURL = process.env.DATABASE_URL_TEST;
        _logFile = 'log-test.log';
        break;
    default:
        _databaseURL = process.env.DATABASE_URL;
        _logFile = 'log-dev.log';
}
export const PORT = process.env.PORT || 4100;
export const JWT_SECRET = process.env.JWT_SECRET || 'supersecretdonotshare';
export const JWT_VALIDITY = process.env.JWT_VALIDITY || 3600;
export const SESSION_SECRET =
    process.env.SESSION_SECRET || 'supersecretdonotshare';
export const SESSION_MAX_AGE = process.env.SESSION_MAX_AGE
    ? parseInt(process.env.SESSION_MAX_AGE)
    : 1000 * 60 * 60 * 24 * 7;

export const DATABASE_URL = _databaseURL;
export const LOG_FILE = _logFile;

export default {
    PORT,
    JWT_SECRET,
    JWT_VALIDITY,
    SESSION_SECRET,
    SESSION_MAX_AGE,
    DATABASE_URL,
    LOG_FILE,
};

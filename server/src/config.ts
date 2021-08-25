import dotenv from 'dotenv';

dotenv.config();

// values according to current env
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

// default values for env variables
export const PORT = process.env.PORT || 4100;
export const SESSION_SECRET =
    process.env.SESSION_SECRET || 'supersecretdonotshare';
export const SESSION_MAX_AGE = process.env.SESSION_MAX_AGE
    ? parseInt(process.env.SESSION_MAX_AGE)
    : 1000 * 60 * 60 * 24 * 7;

export const DATABASE_URL = _databaseURL;
export const LOG_FILE = _logFile;

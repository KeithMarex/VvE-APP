import { createLogger, transports, format } from 'winston';

const logFormat = format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
})

export const successLog = createLogger({
    level: 'success',
    format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        format.errors({stack: true}),
        logFormat
        ),
    transports: [
        new (transports.Console)(),
        new (transports.File)({ filename: './logs/success.log'}),
    ]
})

export const errorLog = createLogger({
    level: 'error',
    format: logFormat,
    transports: [
        new (transports.Console)(),
        new (transports.File)({ filename: './logs/error.log'}),
    ]
})
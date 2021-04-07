import winston from 'winston';

export const successLog = winston.createLogger({
    level: 'success',
    format: winston.format.json(),
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: './logs/success.log'}),
    ]
})

export const errorLog = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: './logs/error.log'}),
    ]
})
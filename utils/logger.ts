import * as winston from 'winston';

export default class Logger {
    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: 'books-reservation-agency' },
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'errors.log', level: 'error' }),
                new winston.transports.File({ filename: 'all.log' }),
            ],
        });
    }

    info(message: string) {
        this.logger.info(message);
    }

    error(message: string) {
        this.logger.error(message);
    }
}

import * as winston from 'winston';
import * as moment from 'moment';

export class Winston {
    private logDir: string;
    private filename: string;

    constructor(logDir: string, filename: string) {
        this.logDir = logDir;
        this.filename = filename;
    }

    saveExecution(message: String) {
        const logger = winston.createLogger({
            transports:  [
                new winston.transports.Console({ level: 'info' }),
                new winston.transports.File({ filename: `${this.logDir}/${this.filename}` })
            ]
        });

        const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

        logger.info({
            date: date,
            message: message
        });
    }
}

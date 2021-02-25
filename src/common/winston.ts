import * as winston from 'winston';
import * as moment from 'moment';

export class Winston {
    private logDir: string;

    constructor(logDir: string) {
        this.logDir = logDir;
    }

    saveExecution(message: String) {
        const logger = winston.createLogger({
            transports:  [
                new winston.transports.Console({ level: 'info' }),
                new winston.transports.File({ filename: `${this.logDir}/execution.log` })
            ]
        });

        const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

        logger.info({
            date: date,
            message: message
        });
    }
}

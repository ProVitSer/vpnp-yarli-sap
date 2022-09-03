import {Inject, Injectable} from '@nestjs/common';
import * as winston from 'winston';
import * as Transport from 'winston-transport';
import 'winston-daily-rotate-file';
import { createLogger } from 'winston';
const { combine, timestamp, label, printf, splat } = winston.format;

@Injectable()
export class LoggerService {
    private context = 'VPNP';

    constructor(
        @Inject('winston') private readonly logger: winston.Logger,

    ) {}

    info(message: any, serviceContext?: string): void {
        this.logger.info(message, { context: `${this.context}-${serviceContext}`  });
    }

    debug(message: string, serviceContext?: string): void {
        this.logger.debug(message, { context: `${this.context}-${serviceContext}` });
    }

    error(message: string, serviceContext?: string): void {
        this.logger.error(message, { context: `${this.context}-${serviceContext}`  });
    }
}
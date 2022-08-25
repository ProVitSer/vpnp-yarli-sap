import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerService } from './logger.service';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as Transport from 'winston-transport';
import 'winston-daily-rotate-file';
const { combine, timestamp, label, printf, splat } = winston.format;
import * as moment from 'moment';

@Module({
    imports: [
        WinstonModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const levels = ['info']
                const transports: Transport[] = [];
                levels.map((level: string) => {
                    transports.push(
                        new winston.transports.DailyRotateFile({
                            dirname: `${configService.get('log.path')}`,
                            level: level,
                            filename: `%DATE%.log`,
                            datePattern: `${configService.get('log.formatDate')}`,
                            handleExceptions: true,
                            json: true,
                            zippedArchive: false,
                            maxSize: `${configService.get('log.maxSize')}`,
                            maxFiles: `${configService.get('log.maxFiles')}`
                        })
                    )
                });
                return {
                    format: combine(timestamp(), splat(), printf(({ level, context, message, timestamp }) => {
                        return ` ${timestamp} [${context}] ${level}: ${JSON.stringify(message)}`;
                    })),
                    transports,
                };
            },
            inject: [ConfigService],
        }),
    ],
    providers: [LoggerService],
    exports: [LoggerService],
})
export class LoggerModule { }
import { LoggerModule } from '@app/logger/logger.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as namiLib from 'nami';
import { AsteriskAmi } from './asterisk-ami';
import { AsteriskService } from './asterisk.service';
import { AsteriskController } from './asterisk.controller';
import { LoggerMiddleware } from '@app/middlewares/logger.middleware';

@Module({
    imports: [ConfigModule, LoggerModule],
    providers:[
        {
            provide: 'AMI',
            useFactory: async (configService: ConfigService) => {
                return new namiLib.Nami({
                    username: configService.get('voip.asterisk.ami.username'),
                    secret: configService.get('voip.asterisk.ami.password'),
                    host: configService.get('voip.asterisk.ami.host'),
                    port: configService.get('voip.asterisk.ami.port')
                })

            },
            inject: [ConfigService]
        },
        AsteriskAmi,
        AsteriskService
    ],
    exports:[AsteriskAmi, AsteriskService],
    controllers: [AsteriskController],
})
export class AsteriskModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(AsteriskController);
      }
}

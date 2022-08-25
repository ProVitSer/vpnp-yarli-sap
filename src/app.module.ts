import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AsteriskModule } from './asterisk/asterisk.module';
import { LoggerModule } from './logger/logger.module';
import { OrmModule } from './orm/orm.module';
import { MicroserviceModule } from './microservice/microservice.module';
import configuration from './config/config.provider';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] }), AsteriskModule, LoggerModule, MicroserviceModule],
  controllers: [],
  providers: [],
  exports:[ConfigModule]
})
export class AppModule {}

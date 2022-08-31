import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AsteriskModule } from './asterisk/asterisk.module';
import { LoggerModule } from './logger/logger.module';
import { OrmModule } from './orm/orm.module';
import { MicroserviceModule } from './microservice/microservice.module';
import { CdrModule } from './cdr/cdr.module';
import configuration from './config/config.provider';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DockerModule } from './docker/docker.module';
import { SeleniumModule } from './selenium/selenium.module';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] }), AsteriskModule, LoggerModule, MicroserviceModule, OrmModule, CdrModule, DockerModule, SeleniumModule],
  controllers: [AppController],
  providers: [AppService],
  exports:[ConfigModule]
})
export class AppModule {}

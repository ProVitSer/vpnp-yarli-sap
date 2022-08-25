import { LoggerModule } from '@app/logger/logger.module';
import { OrmModule } from '@app/orm/orm.module';
import {  Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CdrTcpServer } from './cdr-tcp.server';
import { CdrService } from './cdr.service';

@Module({
    providers: [CdrTcpServer, CdrService],
    imports:[ConfigModule, LoggerModule],
    exports: [],
  
})
export class MicroserviceModule {}

import { CdrModule } from '@app/cdr/cdr.module';
import { LoggerModule } from '@app/logger/logger.module';
import {  Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TcpServer } from './tcp.server';

@Module({
    providers: [TcpServer],
    imports:[ConfigModule, LoggerModule, CdrModule],
    exports: [TcpServer],
  
})
export class MicroserviceModule {}

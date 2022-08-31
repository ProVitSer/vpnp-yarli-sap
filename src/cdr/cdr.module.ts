import { LoggerModule } from '@app/logger/logger.module';
import { OrmModule } from '@app/orm/orm.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CdrParserProvider } from './cdr-parser.provider';
import { CdrService } from './cdr.service';
import { ParseCrmCall } from './providers/crm';
import { ParseInbound } from './providers/inbound';
import { ParseOutbound } from './providers/outbound';

@Module({
  imports:[ConfigModule, LoggerModule, OrmModule],
  providers: [CdrService, CdrParserProvider, ParseInbound, ParseOutbound, ParseCrmCall],
  exports:[CdrService]
})
export class CdrModule {}

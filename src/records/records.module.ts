import { LoggerModule } from '@app/logger/logger.module';
import { LoggerMiddleware } from '@app/middlewares/logger.middleware';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';

@Module({
  imports:[ConfigModule, LoggerModule],
  controllers: [RecordsController],
  providers: [RecordsService]
})
export class RecordsModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
        .apply(LoggerMiddleware)
        .forRoutes(RecordsController);
  }
}

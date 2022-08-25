import { LoggerModule } from '@app/logger/logger.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallInfoService } from './call-info.service';
import { CallcentQueuecalls } from './entities/CallcentQueuecalls';
import { ClCalls } from './entities/ClCalls';
import { ClParticipants } from './entities/ClParticipants';
import { ClPartyInfo } from './entities/ClPartyInfo';
import { ClSegments } from './entities/ClSegments';
import { OrmService } from './orm.service';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        name: 'postgres',
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'pgpwd4habr',
        database: 'postgres',
        entities: [],
        synchronize: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([ClParticipants,ClPartyInfo,ClSegments,ClCalls,CallcentQueuecalls]),
  ],
  providers: [OrmService , CallInfoService]
})
export class OrmModule {}

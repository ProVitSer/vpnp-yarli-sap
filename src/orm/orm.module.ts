import { LoggerModule } from '@app/logger/logger.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallInfoService } from './call-info.service';
import { ClSegments, CallcentQueuecalls, ClCalls, ClParticipants, ClPartyInfo } from './entities';
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
        host: config.get('postgres.host'),
        port: config.get('postgres.port'),
        username: config.get('postgres.username'),
        password: config.get('postgres.password'),
        database: config.get('postgres.database'),
        entities: [__dirname + '/entities/*{.ts,.js}'],
        synchronize: false,
        useUnifiedTopology: false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([ClSegments, CallcentQueuecalls, ClCalls, ClParticipants, ClPartyInfo]),
  ],
  providers: [OrmService , CallInfoService],
  exports:[OrmService]
})
export class OrmModule {}

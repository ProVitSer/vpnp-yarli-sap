import { HealthModule } from '@app/health/health.module';
import { LoggerModule } from '@app/logger/logger.module';
import { MailModule } from '@app/mail/mail.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule as Schedule} from '@nestjs/schedule';
import { HealthServiceScheduledService } from './scheduled/healthServiceScheduled';

@Module({
    imports: [Schedule.forRoot(), LoggerModule, ConfigModule, HealthModule, MailModule],
    providers: []
})
export class ScheduleModule {}

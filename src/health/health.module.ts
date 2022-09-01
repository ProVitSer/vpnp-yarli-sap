import { AsteriskModule } from '@app/asterisk/asterisk.module';
import { AsteriskService } from '@app/asterisk/asterisk.service';
import { DockerModule } from '@app/docker/docker.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { AsteriskServiceHealthIndicator } from './health-indicator/asterisk.service.healthIndicator';
import { DockerImgServiceHealthIndicator, DockerServiceHealthIndicator } from './health-indicator/docker.service.healthIndicator';
import { FilaPathExistHealthIndicator } from './health-indicator/fsPathExist.healthIndicator';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  imports: [TerminusModule, ConfigModule, AsteriskModule, DockerModule],
  controllers: [HealthController],
  providers: [HealthService, AsteriskServiceHealthIndicator, DockerServiceHealthIndicator, DockerImgServiceHealthIndicator, FilaPathExistHealthIndicator],
})
export class HealthModule {}

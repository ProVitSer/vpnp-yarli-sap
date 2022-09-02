import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';
import { HealthService } from './health.service';
import { ReturnHealthFormatType } from './types/types';

@Controller('health')
export class HealthController {
    constructor(
        private readonly healthService: HealthService
      ) {}
     
      @Get()
      @HealthCheck()
      async healthCheck() {
        return await this.healthService.check<HealthCheckResult>(ReturnHealthFormatType.mail);
      }
}

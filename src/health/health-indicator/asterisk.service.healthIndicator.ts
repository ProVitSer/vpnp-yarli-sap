import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';
import { AsteriskService } from '../../asterisk/asterisk.service'
@Injectable()
export class AsteriskServiceHealthIndicator extends HealthIndicator {
  constructor(
    private readonly asterisk: AsteriskService
  ) {
    super();
  }
 
  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.asterisk.ping();
      return this.getStatus(key, true);
    } catch (e) {
      throw new HealthCheckError(
        `${key} failed`,
        this.getStatus(key, false)
      );
    }
  }
}
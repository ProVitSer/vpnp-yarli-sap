import { DockerService } from '@app/docker/docker.service';
import { UtilsService } from '@app/utils/utils.service';
import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';


@Injectable()
export class FilaPathExistHealthIndicator extends HealthIndicator {
  constructor(
  ) {
    super();
  }
 
  async isHealthy(filePath: string, key: string): Promise<HealthIndicatorResult> {
    try {
      const exist = await UtilsService.exists(filePath);
      if(!exist) throw `${filePath} недоступна`
      return this.getStatus(key, true);
    } catch (e) {
      throw new HealthCheckError(
        `${key} failed: ${e}`,
        this.getStatus(key, false)
      );
    }
  }
}
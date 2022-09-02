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
      const errorMsg = e;
      throw new HealthCheckError(
        `${key} failed`,
        this.getStatus(key, false, { message: errorMsg })
      );
    }
  }
}
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { HealthCheckService, TypeOrmHealthIndicator, HealthIndicatorResult, MicroserviceHealthIndicator, HealthCheckError, HealthCheckResult } from '@nestjs/terminus';
import { AsteriskServiceHealthIndicator } from './health-indicator/asterisk.service.healthIndicator';
import { DockerImgServiceHealthIndicator, DockerServiceHealthIndicator } from './health-indicator/docker.service.healthIndicator';
import { FilaPathExistHealthIndicator } from './health-indicator/fsPathExist.healthIndicator';
import { HealthCheckMailFormat, ServiceInfo } from './types/interfaces';
import { HealthCheckStatusType, ReturnHealthFormatType } from './types/types';

@Injectable()
export class HealthService {
    private statusService: Array<{[key:string]: any}>
    constructor(
        private readonly configService: ConfigService,
        private healthCheckService: HealthCheckService,
        private typeOrmHealthIndicator: TypeOrmHealthIndicator,
        private microservice: MicroserviceHealthIndicator,
        private asteriskService: AsteriskServiceHealthIndicator,
        private dockerService: DockerServiceHealthIndicator,
        private dockerImg: DockerImgServiceHealthIndicator,
        private fs: FilaPathExistHealthIndicator

    ) {
        this.statusService = [];
    }

    public async check<T>(formatType: ReturnHealthFormatType):Promise<T>{
      try {
        const result = await this.healthCheckService.check([
          async () => this.typeOrmHealthIndicator.pingCheck('DatabaseService'),
          async () => this.microservice.pingCheck('CdrServer', { transport: Transport.TCP, options: { host: this.configService.get('tcpServer.host'), port: this.configService.get('tcpServer.port') }}),
          ...this.customCheck()
        ]);
        return new HealthFormatResult(result, formatType).format();
      }catch(e){
        return new HealthFormatResult(e.response, formatType).format();
      }
    }

    private customCheck(){
        return [
            async () => this.asteriskService.isHealthy('AsteriskService'),
            async () => this.dockerService.isHealthy('DockerService'),
            async () => this.dockerImg.isHealthy(this.configService.get('selenium.selenoidDockerImg'),'DockerSelenoid'),
            async () => this.fs.isHealthy(`${this.configService.get('windowsSharePath')}/278`,'WindowsShare')                                    
          ]
    }
}


export class HealthFormatResult {
  result: HealthCheckResult;
  formatType: ReturnHealthFormatType

  constructor(result: HealthCheckResult, formatType: ReturnHealthFormatType) {
    this.result = result;
    this.formatType = formatType;
  }

  public format(){
    return this[this.getMethodByFormatType()]();
  }
  

  private getMethodByFormatType(): any {
    switch (this.formatType) {
      case ReturnHealthFormatType.http:
          return 'httpFormat';
      case ReturnHealthFormatType.mail:
          return 'mailFormat';
    }
  }

  private httpFormat(): HealthCheckResult {
    return this.result;
  }

  private mailFormat(): HealthCheckMailFormat{
    const mailInfoFormat = [];

    function parseObj(obj: HealthIndicatorResult){
      Object.keys(obj).forEach((value: string) => {
        mailInfoFormat.push({ serviceName: value, status: obj[value].status, detail: (!!obj[value].message)? {details: obj[value].message} : {} }); 
      })
    }

    const resultInfo = (this.result.status === 'error')? {...this.result.info, ...this.result.error} : {...this.result.info};
    parseObj(resultInfo);
    return {
      status: this.result.status as HealthCheckStatusType,
      service: mailInfoFormat
    }
  }
}

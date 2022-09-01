import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { HealthCheckService, TypeOrmHealthIndicator, HealthIndicatorResult, MicroserviceHealthIndicator, HealthCheckError } from '@nestjs/terminus';
import { AsteriskServiceHealthIndicator } from './health-indicator/asterisk.service.healthIndicator';
import { DockerImgServiceHealthIndicator, DockerServiceHealthIndicator } from './health-indicator/docker.service.healthIndicator';
import { FilaPathExistHealthIndicator } from './health-indicator/fsPathExist.healthIndicator';

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

    public async check(){
        const result = await this.healthCheckService.check([
          async () => this.typeOrmHealthIndicator.pingCheck('DatabaseService').then( (value: HealthIndicatorResult) => {
            this.statusService.push(value);
            return value;
          }),
          async () => this.microservice.pingCheck('CdrServer', { transport: Transport.TCP, options: { 
            host: this.configService.get('tcpServer.host'), port: this.configService.get('tcpServer.port') }})
            .then( (value: HealthIndicatorResult) => {
            this.statusService.push(value);
            return value;
          }),
          ...this.customCheck()
        ]).catch((e:any) => { console.log(e); return e.response;});
        return result;
    }

    private customCheck(){
        return [
            async () => this.asteriskService.isHealthy('AsteriskService').then( (value: HealthIndicatorResult) => {
                this.statusService.push(value);
                return value;
              }),
            async () => this.dockerService.isHealthy('DockerService').then( (value: HealthIndicatorResult) => {
                this.statusService.push(value);
                return value;
              }), 
            async () => this.dockerImg.isHealthy(this.configService.get('selenium.selenoidDockerImg'),'DockerSelenoid').then( (value: HealthIndicatorResult) => {
                this.statusService.push(value);
                return value;
              }), 
            async () => this.fs.isHealthy(`${this.configService.get('windowsSharePath')}/777`,'WindowsShare').then( (value: HealthIndicatorResult) => {
                this.statusService.push(value);
                return value;
              })//.catch((e:HealthCheckError) => {console.log(e); return e;}),                                             
            ]
    }
}

// response: {
//     status: 'error',
//     info: {
//       DatabaseService: [Object],
//       CdrServer: [Object],
//       AsteriskService: [Object],
//       DockerService: [Object],
//       DockerSelenoid: [Object]
//     },
//     error: { WindowsShare: [Object] },
//     details: {
//       DatabaseService: [Object],
//       CdrServer: [Object],
//       AsteriskService: [Object],
//       DockerService: [Object],
//       DockerSelenoid: [Object],
//       WindowsShare: [Object]
//     }
//   },
//   status: 503
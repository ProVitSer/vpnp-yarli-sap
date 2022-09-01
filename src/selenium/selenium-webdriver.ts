import { DockerService } from '@app/docker/docker.service';
import { LoggerService } from '@app/logger/logger.service';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Builder } from 'selenium-webdriver'
import { Capabilities } from './types/interfaces';


@Injectable()
export class SeleniumWebdriver implements OnApplicationBootstrap  {
    private capabilities: Capabilities;
    private readonly seleniumDockerImg = 'aerokube/selenoid:1.10.8';
    constructor(
        private readonly configService: ConfigService,
        private readonly logger: LoggerService,
        private readonly docker: DockerService
    ) {
        this.capabilities = this.configService.get('selenium.capabilities')
    }


    async onApplicationBootstrap() {
        try {
            await this.docker.checkImgUp(this.seleniumDockerImg);
        } catch(e){
            this.logger.error(e)
        }
    }

    public async getWebDriver(){
        try {
            return await new Builder().usingServer('http://localhost:4444/wd/hub').withCapabilities(this.capabilities).build();
        } catch(e){
            throw e;
        }
    }
}
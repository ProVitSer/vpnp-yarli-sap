import { LoggerService } from '@app/logger/logger.service';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Builder } from 'selenium-webdriver'
import { Capabilities } from './types/interfaces';


@Injectable()
export class SeleniumWebdriver implements OnApplicationBootstrap  {
    private capabilities: Capabilities;
    constructor(
        private readonly configService: ConfigService,
        private readonly logger: LoggerService,
    ) {
        this.capabilities = this.configService.get('selenium.capabilities')
    }


    async onApplicationBootstrap() {
        try {

        } catch(e){

        }
    }

    public async getWebDriver(){
        return await new Builder().usingServer('http://localhost:4444/wd/hub').withCapabilities(this.capabilities).build();
    }
}
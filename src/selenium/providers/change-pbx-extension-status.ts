import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ChangeStatusInfo, SeleniumProviderInterface, StatusMap } from "../types/interfaces";
import { Login } from "./login";
import { Builder,By, Key, until, WebDriver  } from 'selenium-webdriver'
import { ApiExtensionStatus } from "../types/type";
import { Logout } from "./logout";

@Injectable()
export class ChangeExtensionStatus implements SeleniumProviderInterface {
    private webDriver: WebDriver;
    constructor(
        private readonly login: Login,
        private readonly logout: Logout,
        private readonly configService: ConfigService,

    ) {}

    async seleniumChange(data: ChangeStatusInfo): Promise<any> {
        try {
            return this.change(data);
        }catch(e){
            throw e;
        }
    } 

    private async change(data: ChangeStatusInfo){
        try {
            this.webDriver = await this.login.loginOnPbx();
            await this.webDriver.get(`https://${this.configService.get('voip.pbx3cx.url')}/#/app/extensions`);
            await this.webDriver.wait(until.elementLocated(By.xpath("//input[@id='inputSearch']")), 10 * 10000);
            await this.webDriver.findElement(By.xpath("//input[@id='inputSearch']")).sendKeys(data.extension);
            await this.webDriver.sleep(5000);
            await this.chechSearchExtension(data.extension);
            await this.webDriver.findElement(By.xpath(`//*[contains(text(), ' ${data.extension} ')]//parent::tr[@tabindex='0']/td[@mc-select-row="item"]`)).click();
            await this.webDriver.sleep(1000);
            await this.webDriver.findElement(By.id('btnStatus')).click();
            await this.webDriver.sleep(1000);
            await this.webDriver.findElement(By.xpath("//select[@ng-model='currentProfile']")).click();
            await this.setStatus(data.status);
            return await this.logout.logoutOnPbx(this.webDriver);
        }catch(e){
            (!!this.webDriver)? await this.webDriver.quit() : '';
            throw e;
        }
    }

    private async setStatus(status: ApiExtensionStatus){
        try {
            const needStatus = StatusMap[status];
            console.log(needStatus)
            await this.webDriver.sleep(2000);
            await this.webDriver.findElement(By.xpath(`//option[@value='${needStatus}']`)).click();
            await this.webDriver.sleep(2000);
            await this.webDriver.findElement(By.className('close')).click();
        } catch(e){
            throw 'Проблемы с изменением статуса по добавочному номеру'
        }
    }

    private async chechSearchExtension(extension: number){
        try {
            await this.webDriver.wait(until.elementLocated(By.xpath("//label[@tabindex='0']")), 10 * 10000);
            await this.webDriver.findElement(By.xpath(`//*[contains(text(), ' ${extension} ')]`))
            return await this.webDriver.sleep(5000);
        } catch(e){
            throw 'Запрашиваемый добавочный не найден на АТС'
        }
    }
}






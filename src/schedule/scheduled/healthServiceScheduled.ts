import { HealthService } from "@app/health/health.service";
import { HealthCheckMailFormat } from "@app/health/types/interfaces";
import { HealthCheckStatusType, ReturnHealthFormatType } from "@app/health/types/types";
import { LoggerService } from "@app/logger/logger.service";
import { MailService } from "@app/mail/mail.service";
import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cron, CronExpression } from "@nestjs/schedule";
import { MailSubjectTypeMap } from "../types/interfaces";

interface MailSendInfo {
    isScheduledSend: boolean;
    lastCheckStatus: HealthCheckStatusType;
}

@Injectable()
export class HealthServiceScheduledService implements OnApplicationBootstrap{
    private mailSendInfo: MailSendInfo;
    private serviceContext: string;
    constructor(
        private readonly configService: ConfigService,
        private readonly logger: LoggerService,
        private readonly health: HealthService,
        private readonly mail: MailService
      ) {
        this.serviceContext = HealthServiceScheduledService.name;
        this.mailSendInfo = {
            isScheduledSend: false,
            lastCheckStatus: HealthCheckStatusType.ok
        }
      }


    async onApplicationBootstrap(){
        try {
            const result = await this.health.check<HealthCheckMailFormat>(ReturnHealthFormatType.mail);
            this.mailSendInfo.lastCheckStatus = result.status;
            return await this.sendMailInfo(result)
        }catch(e){
            this.logger.error(`Error HealthServiceScheduledService on application start  ${e}`, this.serviceContext)
        }
    }  
    
    @Cron(CronExpression.EVERY_MINUTE)
    async sendScheduled() {
        try{
            const result = await this.health.check<HealthCheckMailFormat>(ReturnHealthFormatType.mail);
            this.logger.info(result, this.serviceContext)
            if(this.checkSendMail(result.status)){
                this.mailSendInfo.isScheduledSend = true;
                this.mailSendInfo.lastCheckStatus = result.status;
                return await this.sendMailInfo(result)
            } 
        }catch(e){
            this.logger.error(`Error HealthServiceScheduledService ${e}`, this.serviceContext)
        }
    }

    @Cron(CronExpression.EVERY_5_MINUTES)
    enableMailSend(){
        return this.mailSendInfo.isScheduledSend = false;
    }

    private async sendMailInfo(healthResult: HealthCheckMailFormat){
        try {
            const sendMailInfo = this.getSendMailInfoData(healthResult);
            return await this.mail.sendMail(sendMailInfo);
        }catch(e){
            this.logger.error(`Error send mail from HealthServiceScheduledService ${e}`, this.serviceContext)
        }
    }

    private checkSendMail(healthStatus: HealthCheckStatusType ): boolean {
        if(this.mailSendInfo.isScheduledSend && this.mailSendInfo.lastCheckStatus !== healthStatus){
            return true;
        } else if(!this.mailSendInfo.isScheduledSend && this.mailSendInfo.lastCheckStatus !== healthStatus){
            return true;
        }
        return false;
    }

    private getSendMailInfoData(healthResult: HealthCheckMailFormat){
        return {
            to: this.configService.get('mail.mailListNotifyer'),
            from: this.configService.get('mail.mailFrom'), 
            subject: MailSubjectTypeMap[healthResult.status], 
            context: { service: healthResult.service}, 
            template: "service-status.hbs"
        }
    }
}
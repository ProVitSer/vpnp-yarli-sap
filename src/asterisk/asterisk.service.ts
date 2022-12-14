import { Injectable } from '@nestjs/common';
import { AsteriskAmi } from './asterisk-ami';
import * as namiLib from 'nami';
import { AMIOUTBOUNDCALL } from './config';
import { AsteriskPingActionResponse, ChannelType } from './types/types';
import { AmiCall } from './types/interfaces';
import * as moment from 'moment';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@app/logger/logger.service';

@Injectable()
export class AsteriskService {
    private serviceContext: string;
    constructor(
        private readonly logger: LoggerService,
        private readonly configServcie: ConfigService,
        private readonly ami : AsteriskAmi, 
    ) {
        this.serviceContext = AsteriskService.name;
    }

    public async sendAmiCall(data: AmiCall): Promise<void> {
        try {
            const { extension, dialedNumber } = data;
            const outboundNumber = dialedNumber.replace(/\s/g, '');
            this.logger.info(`Исходящий вызов из webhook CRM: внутренний номер ${extension} внешний номер ${outboundNumber}`);
            const action = new namiLib.Actions.Originate();
            action.channel = `local/${extension}:${outboundNumber}@${this.configServcie.get('voip.pbx3cx.routeTo3cx.localContext')}`,
            action.callerid = outboundNumber;
            action.priority = AMIOUTBOUNDCALL.priority;
            action.timeout = AMIOUTBOUNDCALL.timeout;
            action.context = this.configServcie.get('voip.pbx3cx.routeTo3cx.externalContext');
            action.exten = outboundNumber;
            action.variable = `var1=${extension}`;
            action.channelid = moment().unix()
            action.async = AMIOUTBOUNDCALL.async;
            this.logger.info(`Результат инициации вызова ${JSON.stringify(action)}`);

            const resultInitCall : any = await this.ami.amiClientSend(action)
            this.logger.info(`Результат инициации вызова ${JSON.stringify(resultInitCall)}`, this.serviceContext);
        } catch(e){
            this.logger.error(`Error send AMI Call: ${e}`, this.serviceContext);
            throw e;
        }
    }

    public async ping(): Promise<boolean>{
        try {
            const action = new namiLib.Actions.Ping();
            const result = await this.ami.amiClientSend<AsteriskPingActionResponse>(action);
            if(!!result && result.response !== 'Success') throw result;
            return true;
        }catch(e){
            this.logger.error(`Error ping Asterisk: ${e}`, this.serviceContext);
            throw e;
        }
    }
}



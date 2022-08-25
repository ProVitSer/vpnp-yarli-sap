import { LoggerService } from '@app/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { AsteriskAmi } from './asterisk-ami';
import * as namiLib from 'nami';
import { AMIOUTBOUNDCALL } from './config';
import { ChannelType } from './types/types';
import { AmiCall } from './types/interfaces';

@Injectable()
export class AsteriskService {

    constructor(
        private readonly logger: LoggerService,
        private readonly ami : AsteriskAmi, 
    ) {
    }

    public async sendAmiCall(data: AmiCall): Promise<void> {
        try {
            const { extension, dialedNumber } = data;
            this.logger.info(`Исходящий вызов из webhook CRM: внутренний номер ${extension} внешний номер ${dialedNumber}`);
            const action = new namiLib.Actions.Originate();
            action.channel = `${ChannelType.PJSIP}/${extension}`; 
            action.callerid = extension;
            action.priority = AMIOUTBOUNDCALL.priority;
            action.timeout = AMIOUTBOUNDCALL.timeout;
            action.context = AMIOUTBOUNDCALL.timeout;
            action.exten = dialedNumber;
            action.async = AMIOUTBOUNDCALL.async;
            const resultInitCall : any = await this.ami.amiClientSend(action)
            this.logger.info(`Результат инициации вызова ${resultInitCall}`);
        } catch(e){
            throw e;
        }
    }

}

import { LoggerService } from "@app/logger/logger.service";
import { CallsInfo } from "@app/orm/interfaces/types";
import { Injectable } from "@nestjs/common";
import { ParseInbound } from "./providers/inbound";
import { ParseOutbound } from "./providers/outbound";
import { ExternalCallInfo, FormatCallInfo, ParseProviderInterface } from "./types/interfaces";
import { Directory } from "./types/types";

@Injectable()
export class CdrParserProvider {

    constructor(
        private readonly logger: LoggerService,
        private readonly parseInbound: ParseInbound,
        private readonly parseOutbound: ParseOutbound,


    ){}

    get providers(): any {
        return {
            [Directory.inbound]: this.parseInbound,
            [Directory.outbound]: this.parseOutbound,
        };
    }

    public async parse(data: FormatCallInfo, dbInfo: CallsInfo[]): Promise<Omit<ExternalCallInfo, 'route'>> {  
        try {
            const provider = this.getProvider(data.apiCallInfo.callStatus);
            console.log(provider)
            return provider.parseCallInfo(data , dbInfo);
        } catch(e){
            this.logger.error(e);
            throw e;
        }

    }
    
    private getProvider(action: Directory): ParseProviderInterface {
        return this.providers[action];
    }


}
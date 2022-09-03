import { LoggerService } from "@app/logger/logger.service";
import { CallsInfo } from "@app/orm/interfaces/types";
import { Injectable } from "@nestjs/common";
import { ParseCrmCall } from "./providers/crm";
import { ParseInbound } from "./providers/inbound";
import { ParseOutbound } from "./providers/outbound";
import { FormatCallInfo, ParseProviderInterface, SapCallInfo } from "./types/interfaces";
import { Directory } from "./types/types";

@Injectable()
export class CdrParserProvider {
    private serviceContext: string;
    constructor(
        private readonly logger: LoggerService,
        private readonly parseInbound: ParseInbound,
        private readonly parseOutbound: ParseOutbound,
        private readonly parseCrmCall: ParseCrmCall,
    ){
        this.serviceContext = CdrParserProvider.name;
    }

    get providers(): any {
        return {
            [Directory.inbound]: this.parseInbound,
            [Directory.outbound]: this.parseOutbound,
            [Directory.crm]: this.parseCrmCall,

        };
    }

    public async parse(data: FormatCallInfo, dbInfo: CallsInfo[]): Promise<SapCallInfo[]> {  
        try {
            const provider = this.getProvider(data.apiCallInfo.callStatus);
            return await provider.parseCallInfo(data , dbInfo);
        } catch(e){
            this.logger.error(e, this.serviceContext);
            throw e;
        }

    }
    
    private getProvider(action: Directory): ParseProviderInterface {
        return this.providers[action];
    }


}
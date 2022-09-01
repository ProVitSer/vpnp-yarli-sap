import { CallsInfo } from "@app/orm/interfaces/types";
import { Injectable } from "@nestjs/common";
import { ExternalCallInfo, FormatCallInfo, ParseProviderInterface, SapCallInfo } from "../types/interfaces";
import { CallResult } from "../types/types";
import * as moment from 'moment';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ParseOutbound implements ParseProviderInterface {
    private readonly recordUrl: string;
    constructor(
        private readonly configService: ConfigService
    ){
        this.recordUrl = `${this.configService.get('recordsUrl')}`;
    }

    async parseCallInfo(data: FormatCallInfo, dbInfo: CallsInfo[]): Promise<SapCallInfo[]> {
        try {
            if(!dbInfo && dbInfo.length == 0 ) throw 'Отсутствует данные из БД для анализа';
            const { apiCallInfo } = data;
            console.log(apiCallInfo, dbInfo)
            return [{
                uniq: apiCallInfo.uniq,
                '3cxId': apiCallInfo["3cxId"],
                incomingNumber: apiCallInfo.incomingNumber,
                dialedNumber: apiCallInfo.dialedNumber,
                extension: apiCallInfo.extension,
                duration: apiCallInfo.duration,
                createdAt: moment(data.apiCallInfo.createdAt, 'YYYY-MM-DD H:mm:ss').unix().toString(),
                callStatus: apiCallInfo.callStatus,
                callResult: (!!dbInfo[dbInfo.length -1].billing_duration)? CallResult.ANSWER: CallResult.BUSY,
                link: `${this.recordUrl}${dbInfo[0].recording_url}`
            }]
        }catch(e){
            throw e;
        }

    } 
}
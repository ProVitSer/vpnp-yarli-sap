import { CallsInfo } from "@app/orm/interfaces/types";
import { Injectable } from "@nestjs/common";
import { ExternalCallInfo, FormatCallInfo, ParseProviderInterface } from "../types/interfaces";
import { CallResult } from "../types/types";

@Injectable()
export class ParseOutbound implements ParseProviderInterface {
    async parseCallInfo(data: FormatCallInfo, dbInfo: any[]): Promise<any> {
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
            createdAt: apiCallInfo.createdAt,
            callStatus: apiCallInfo.callStatus,
            callResult: (!!dbInfo[dbInfo.length -1].billing_duration)? CallResult.ANSWER: CallResult.BUSY,
            link: dbInfo[0].recording_url
        }]
    } 
}
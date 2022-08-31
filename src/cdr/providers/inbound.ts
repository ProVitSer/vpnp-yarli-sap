import { CallsInfo } from "@app/orm/interfaces/types";
import { Injectable } from "@nestjs/common";
import { DidFullNumberMap } from "../config";
import { ExternalCallInfo, FormatCallInfo, ParseProviderInterface, SapCallInfo } from "../types/interfaces";
import { CallResult, Directory } from "../types/types";
import * as moment from 'moment';

@Injectable()
export class ParseInbound implements ParseProviderInterface {
    async parseCallInfo(data: FormatCallInfo, dbInfo: CallsInfo[]): Promise<SapCallInfo[]> {
        try {
            if(!dbInfo && dbInfo.length == 0 ) throw 'Отсутствует данные из БД для анализа';
            return await this.getSapCallInfo(data, dbInfo);
        }catch(e){
            throw e;
        }

    }

    private async getSapCallInfo(data: FormatCallInfo, dbInfo: CallsInfo[]): Promise<SapCallInfo[]> {
        const capCallIfo: SapCallInfo[] = [];
        const routeDn = this.getNeedDestinationNumber(data.apiCallInfo.route);
        routeDn.map((number: string) => {
            const numberDbInfo = dbInfo.filter( (info: CallsInfo) => { return info.dn == number })[0];
            const sapCallInfo: SapCallInfo = {
                uniq: data.apiCallInfo.uniq,
                '3cxId': data.apiCallInfo["3cxId"],
                incomingNumber: data.apiCallInfo.incomingNumber,
                dialedNumber: this.getDidNumber(dbInfo),
                extension: number,
                createdAt: moment(data.apiCallInfo.createdAt, 'YYYY-MM-DD H:mm:ss').unix().toString(),
                callStatus: Directory.inbound,
                ...this.checkisAnswerCall(numberDbInfo),
                link: numberDbInfo.recording_url,
            };
            capCallIfo.push(sapCallInfo);
        })
        return capCallIfo;
    }

    private checkisAnswerCall(info: CallsInfo): { duration: string, callResult: CallResult}{
        if(info.answer_time == null) return { duration: "", callResult: CallResult.NOTANSWER };

        const answerTime  = moment(info.answer_time);
        const endCallTime = moment(info.end_time);
        return {
            duration: endCallTime.diff(answerTime, 'seconds').toString(),
            callResult: CallResult.ANSWER,
        }
    }


    private getDidNumber(dbInfo: CallsInfo[]){
        return DidFullNumberMap[dbInfo[0].did_number]
    }

    private getNeedDestinationNumber(numbers: Array<string>) {
        return numbers.filter((number: string) => {
            return (number.length == 3 && number.charAt(0) !== "8")
        })
    }
    
}
//     "apiCallInfo":{
//        "uniq":"7a6a0e22-f46e-4f79-a4b6-de7ba917674d",
//        "3cxId":"1835413",
//        "incomingNumber":"84852583901",
//        "dialedNumber":"4852580085",
//        "extension":"396",
//        "duration":"4",
//        "createdAt":"2022-08-31 10:54:46",
//        "callStatus":"inbound",
//        "callResult":"TerminatedBySrc",
//        "route":[
//           "84852583901",
//           "396"
//        ],
//        "link":""
//     },
//     "isExternal":true
//  }
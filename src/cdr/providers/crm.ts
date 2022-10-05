import { CallsInfo } from "@app/orm/interfaces/types";
import { Injectable } from "@nestjs/common";
import { FormatCallInfo, ParseProviderInterface, SapCallInfo } from "../types/interfaces";
import * as moment from 'moment';
import { OrmService } from "@app/orm/orm.service";
import { CallResult, Directory } from "../types/types";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ParseCrmCall implements ParseProviderInterface {
    private readonly recordUrl: string;
    constructor(
        private readonly orm: OrmService,
        private readonly configService: ConfigService

    ){
        this.recordUrl = `${this.configService.get('recordsUrl')}`;
    }

    async parseCallInfo(data: FormatCallInfo, dbInfo: CallsInfo[]): Promise<SapCallInfo[]> {
        try {
            if(!dbInfo && dbInfo.length == 0 ) throw 'Отсутствует данные из БД для анализа';
            const { apiCallInfo } = data;
            const recordUrl = await this.orm.getCrmCallRecord(data.apiCallInfo.dialedNumber, data.apiCallInfo.extension);
            return [{
                uniq: apiCallInfo.uniq,
                '3cxId': apiCallInfo["3cxId"],
                incomingNumber: '',
                dialedNumber: apiCallInfo.dialedNumber,
                extension: apiCallInfo.extension,
                duration: apiCallInfo.duration,
                createdAt: moment(data.apiCallInfo.createdAt, 'YYYY-MM-DD H:mm:ss').unix().toString(),
                callStatus: Directory.outbound,
                callResult: (!!dbInfo[dbInfo.length -1].billing_duration)? CallResult.ANSWER: CallResult.BUSY,
                link: `${this.recordUrl}${recordUrl[0].recording_url}`
            }]
        }catch(e){
            throw e;
        }

    }
}
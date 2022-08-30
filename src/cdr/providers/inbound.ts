import { CallsInfo } from "@app/orm/interfaces/types";
import { Injectable } from "@nestjs/common";
import { FormatCallInfo, ParseProviderInterface } from "../types/interfaces";

@Injectable()
export class ParseInbound implements ParseProviderInterface {
    parseCallInfo(data: FormatCallInfo, dbInfo: CallsInfo[]): Promise<any> {
        if(!dbInfo && dbInfo.length == 0 ) throw 'Отсутствует данные из БД для анализа';
        return;
    }
    
}
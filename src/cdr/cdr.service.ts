import { Injectable } from "@nestjs/common";
import { CdrData, cdrFormatData, ExternalCallInfo, FormatCallInfo, SapCallInfo, TrunkNumber } from "./types/interfaces";
import * as moment from 'moment';
import { OrmService } from "@app/orm/orm.service";
import { UtilsService } from "@app/utils/utils.service";
import { ConfigService } from "@nestjs/config";
import { Directory } from "./types/types";
import { CdrParserProvider } from "./cdr-parser.provider";
import { LoggerService } from "@app/logger/logger.service";
import { HttpService } from '@nestjs/axios'
import * as https from "https";

@Injectable()
export class CdrService {
    private trunkNumber:TrunkNumber;
    private serviceContext: string;
    private headers = {
        'User-Agent': 'Vpnp-Yarli',
        'Content-Type': 'application/json'
    };
    private httpsAgent  = new https.Agent({
        rejectUnauthorized: false,
    });
    constructor(
        private readonly logger: LoggerService,
        private readonly configService: ConfigService,
        private readonly orm: OrmService,
        private readonly parser: CdrParserProvider,
        private readonly httpService: HttpService
    ){
        this.trunkNumber = this.configService.get('pbxTrunkNumber');
        this.serviceContext = CdrService.name;

    }

    async notifyCallInfo(data: Array<string>){
        try {
            const callInfo = this.formatCdrData(data);
            this.logger.info(callInfo, this.serviceContext)
            if(callInfo.isExternal){
                return await this.formatExternalCall(callInfo)
            }   
            return;
        }catch(e){
            this.logger.error('Error parse and notifyCallInfo: ' + e, this.serviceContext)
        }

    }

    private async formatExternalCall(callInfo: FormatCallInfo){
        try {
            this.logger.info(`External Call ${JSON.stringify(callInfo.apiCallInfo)}`, this.serviceContext );
            const dbCallInfo = await this.orm.getExternalCallInfo(Number(callInfo.apiCallInfo["3cxId"]));
            this.logger.info(`Cdr info from DB: ${JSON.stringify(dbCallInfo)}`, this.serviceContext);
            const formatCallsInfo = await this.parser.parse(callInfo, dbCallInfo);
            this.logger.info(`Format data: ${JSON.stringify(formatCallsInfo)}`, this.serviceContext);
            return await Promise.all( formatCallsInfo.map( async (callInfo: SapCallInfo) => {
                try {
                    this.logger.info(`Send Info to SAP ` + JSON.stringify(callInfo), this.serviceContext);
                    const result = await this.httpService.post(this.configService.get('sapUrl'), callInfo, { headers: this.headers, httpsAgent: this.httpsAgent } ).toPromise();
                    this.logger.info(result.status, this.serviceContext);
                }catch(e){
                    this.logger.info(`Error from SAP ${e.code || ''} ${e.data || ''} `, this.serviceContext);
                }
            }))
        }catch(e){
            this.logger.info(`Error formatExternalCall ${e}`, this.serviceContext);
        }
    }

    private formatCdrData(data: Array<string>): FormatCallInfo{
        const formatCdr = {} as CdrData 
        Object.keys(cdrFormatData).forEach((key: string, index: number, array: string[]) => {
            formatCdr[key] = data[index] || '';
        });


        formatCdr.historyid = formatCdr.historyid.match(/Call (\d*)/)[1].toString();
        formatCdr.duration = moment.duration(formatCdr.duration).asSeconds();
        formatCdr.timeStart = UtilsService.formateDate(formatCdr.timeStart);
        formatCdr.timeEnd  = UtilsService.formateDate(formatCdr.timeEnd );
        formatCdr.timeAnswered = UtilsService.formateDate(formatCdr.timeAnswered);
        this.logger.info(formatCdr, this.serviceContext)
        const isExternal = this.checkIsExternalCall(formatCdr);
        const apiCallInfo = (isExternal) ? this.getApiCallInfo(formatCdr) : undefined;


        return { 
            originCallInfo :formatCdr,
            apiCallInfo,
            isExternal,
        };
    }

    private getApiCallInfo(data: CdrData): ExternalCallInfo {
        try {
            const route = data.chain.replace(/[^+\d;]/g, "").replace(/ /g, '').split(";");
            route.pop()
            return {
                uniq: UtilsService.generateId(true),
                '3cxId': data.historyid,
                ...this.numbersInfo(data),
                duration: String(data.duration),  
                createdAt: moment().add(3, 'hour').format('YYYY-MM-DD H:mm:ss'),  
                callStatus: this.getCallStatus(data),
                callResult: data.reasonTerminated,  
                route,
                link: '',   
            } 
        } catch(e){
            throw e;
        }
    }

    private getCallStatus(data: CdrData): Directory{
        if(data.fromDn == this.configService.get('voip.pbx3cx.routeTo3cx.did3cxNumber')) return Directory.crm;
        return (data.toDn.length > 3) ? Directory.outbound : Directory.inbound; 
    }

    private numbersInfo(data: CdrData){
        
        if(data.fromDn.length > 3 && data.toDn.length > 3){
            //Исходящие через бридж
            return {
                incomingNumber: '',
                dialedNumber: data.dialNo,  
                extension: data.fromNo, 
            }
        } else {
            //Исходящие через саму АТС
            return {
                incomingNumber: (data.fromNo.length > 8) ? data.fromNo : '',
                dialedNumber: (data.toDn.length > 3) ?  data.toNo: this.trunkNumber[data.fromDn] || '',  
                extension: (data.fromDn.length > 3) ? data.toDn : data.fromDn, 
            }
        }
    }

    private checkIsExternalCall(data: CdrData): boolean{
        if(data.fromDn == this.configService.get('voip.pbx3cx.routeTo3cx.did3cxNumber')) return true;// Вызов из CRM
        if(data.fromDn.length == 3 && data.toDn.length == 3){// Внутренние вызовы
            return false;
        } else if(data.fromNo.length > 8 && data.toDn.length == 3){ //Входящие
            return true;
        } else if(data.fromDn.length == 3 && data.dialNo.length != 3 && data.dialNo.length > 8){ // Исходящие
            return true;
        }
        return false;

    }
  
}

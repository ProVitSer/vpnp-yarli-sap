import { ReasonTerminated } from "./types";

export interface TrunkNumber {
    [key: string]: string
}

export const cdrFormatData = {
    historyid: '',
    callid: '',
    duration: '',
    timeStart: '',	
    timeAnswered: '',	
    timeEnd: '',	
    reasonTerminated: '',	
    fromNo: '',
    toNo: '',	
    fromDn: '',	
    toDn: '',
    dialNo: '',
    reasonChanged: '',
    finalNumber: '',
    finalDn: '',	
    billCode: '',	
    billRate: '',	
    billCost: '',
    billName: '',	
    chain: '', 
}

export interface CdrData {
    historyid: string;
    callid: string;
    duration: number;
    timeStart: string;	
    timeAnswered: string;	
    timeEnd: string;	
    reasonTerminated: ReasonTerminated;	
    fromNo: string;
    toNo: string;	
    fromDn: string;	
    toDn: string;
    dialNo: string;	
    reasonChanged: string;
    finalNumber: string;
    finalDn: string;	
    billCode: string;	
    billRate: string;	
    billCost: string;
    billName: string;	
    chain: string;
}


export interface ExternalCallInfo {
    uniq: string;
    '3cxId': string;
    incomingNumber?:string;
    dialedNumber: string;
    extension: string;
    duration: string;
    createdAt: string;
    callStatus: string;
    callResult: string;
    route: Array<string>;
    link: string,   
}


export interface FormatCallInfo {
    originCallInfo: CdrData, 
    apiCallInfo?: ExternalCallInfo, 
    isExternal: boolean
}
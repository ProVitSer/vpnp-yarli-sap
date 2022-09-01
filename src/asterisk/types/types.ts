export enum ChannelType {
    PJSIP = "PJSIP",
    SIP = "SIP"
}


export interface AsteriskPingActionResponse {
    lines: Array<string>;
    EOL: string;
    variables: {[key:string]: any};
    response: string;
    actionid: string;
    ping: string;
    timestamp: string;
    events: string;
}
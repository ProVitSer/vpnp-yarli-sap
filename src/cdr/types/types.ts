export enum ReasonTerminated {
    Connected = 'Connected',
    Failed = 'Failed',
    Failed_cancelled = 'Failed_cancelled',
    NoAnswerTimeout = 'NoAnswerTimeout',
    NoRouteExists = 'NoRouteExists',
    Redirected = 'Redirected',
    RouteBusy = 'RouteBusy',
    RouteNotFound = 'RouteNotFound',
    TargetBusy = 'TargetBusy',
    TargetNotFound = 'TargetNotFound',
    TerminatedbyDst = 'TerminatedbyDst',
    TerminatedByRule = 'TerminatedByRule',
    TerminatedBySync = 'TerminatedBySync',
}

export enum Directory {
    inbound = 'inbound',
    outbound = 'outbound',
    crm = 'crm'
} 

export enum CallResult {
    ANSWER = "ANSWER",
    NOTANSWER = "NOTANSWER",
    BUSY = "BUSY",
    CHANUNAVAIL = "CHANUNAVAIL",
}

export interface AmiCall {
    dialedNumber: string;
    extension: string;
}
export interface AsteriskPing {
    status: 'up'| 'down';
}
export interface SendMail {
    to: string | string[];
    from?: string;
    subject?: string;
    context: {[key: string]: any};
    template: string
}

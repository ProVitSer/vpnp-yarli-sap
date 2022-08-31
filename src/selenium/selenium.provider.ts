import { LoggerService } from '@app/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { ChangeExtensionStatus } from './providers/change-pbx-extension-status';
import {  SeleniumDataTypes, SeleniumProviderInterface } from './types/interfaces';
import { ActionType } from './types/type';

@Injectable()
export class SeleniumProvider {
    constructor(
        private readonly logger: LoggerService,
        private readonly changeStatus: ChangeExtensionStatus
    ) {}


    get providers(): any {
        return {
            [ActionType.changePbxExtensionStatus]: this.changeStatus,
        };
    }


    public async change(action: ActionType , data: SeleniumDataTypes){
        try {
            const provider = this.getProvider(action);
            return await provider.seleniumChange(data);
        }catch(e){
            this.logger.error(e);
            throw e;
        }
    }

    private getProvider(action: ActionType): SeleniumProviderInterface {
        return this.providers[action];
    }

}

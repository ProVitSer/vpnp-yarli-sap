import { LoggerService } from '@app/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { CallInfoService } from './call-info.service';
import { CallsInfo } from './interfaces/types';

@Injectable()
export class OrmService {
    constructor(
        private readonly logger: LoggerService,
        private readonly callInfo: CallInfoService
      ) {}


      public async getExternalCallInfo(id: number): Promise<CallsInfo[]>{
          try {
            return await this.callInfo.searchCallInfo(id)
          } catch(e){
              throw e;
          }
      }

      public async getCrmCallRecord(callerNumber: string, extensionNumber: string){
        try {
          const ClPartyInfo = await this.callInfo.getClPartyInfoByNumber(callerNumber, extensionNumber);
          if(!!ClPartyInfo){
            return await this.callInfo.getRecord(ClPartyInfo.id);
          } else {
            throw `ClPartyInfo is empty by: ${callerNumber}, ${extensionNumber}`
          }
        } catch(e){
            throw e;
        }
      }

}

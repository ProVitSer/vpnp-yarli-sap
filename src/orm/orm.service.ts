import { LoggerService } from '@app/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { CallInfoService } from './call-info.service';
// import { ExternalCallInfo } from './interfaces/interface';

@Injectable()
export class OrmService {
    constructor(
        private readonly logger: LoggerService,
        private readonly callInfo: CallInfoService
      ) {}


      public async getExternalCallInfo(incomingNumber: string): Promise<any>{
          try {
            return;
          } catch(e){
              throw e;
          }
      }

}

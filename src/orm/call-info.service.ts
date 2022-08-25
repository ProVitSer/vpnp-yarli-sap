import { LoggerService } from '@app/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CallcentQueuecalls, ClCalls, ClParticipants, ClPartyInfo, ClSegments } from './entities';
import { EntityRepository, Repository } from "typeorm";


@Injectable()
export class CallInfoService {
    constructor(
        private readonly logger: LoggerService,
        @InjectRepository(ClParticipants)
        private callParticipants: Repository<ClParticipants>,
        @InjectRepository(ClPartyInfo)
        private callPartyInfo: Repository<ClPartyInfo>,
        @InjectRepository(ClSegments)
        private callSegments: Repository<ClSegments>,
        @InjectRepository(ClCalls)
        private calls: Repository<ClCalls>,
        @InjectRepository(CallcentQueuecalls)
        private queue: Repository<CallcentQueuecalls>
      ) {}
      
        //Поиск первый ID вызова в базе 3сх
        public async searchFirstIncomingId(incomingNumber: string): Promise<ClPartyInfo>{
            try {
                return await this.callPartyInfo
                    .createQueryBuilder("cl_party_info")
                    .select("cl_party_info.id")
                    .where("cl_party_info.callerNumber like :number", {
                        number: incomingNumber,
                    })
                    .orderBy("cl_party_info.id", "DESC")
                    .getOne();
            } catch(e){
                this.logger.error(`searchFirstIncomingId ${e}`)
            }
        
        }

}

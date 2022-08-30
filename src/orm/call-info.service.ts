import { LoggerService } from '@app/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CallcentQueuecalls, ClCalls, ClParticipants, ClPartyInfo, ClSegments } from './entities';
import { EntityRepository, Repository } from "typeorm";
import { CallsInfo } from './interfaces/types';


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
      
        public async searchCallInfo(id: number): Promise<CallsInfo[]>{
            try {
                return await this.callParticipants.query(`
                SELECT * FROM cl_participants
                FULL OUTER JOIN cl_party_info ON cl_participants.info_id = cl_party_info.id
                WHERE cl_participants.info_id IN (select info_id from cl_participants where call_id = ${id})  
                `);
            } catch(e){
                this.logger.error(`Error get ClPartyInfo info: ${e}`)
            }
        
        }
}

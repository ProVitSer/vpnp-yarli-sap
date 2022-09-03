import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CallcentQueuecalls, ClCalls, ClParticipants, ClPartyInfo, ClSegments } from './entities';
import { Repository } from "typeorm";
import { CallsInfo } from './interfaces/types';
import { LoggerService } from '@app/logger/logger.service';


@Injectable()
export class CallInfoService {
    private serviceContext: string;
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
      ) {
        this.serviceContext = CallInfoService.name;
      }
      
        public async searchCallInfo(id: number): Promise<CallsInfo[]>{
            try {
                return await this.callParticipants.query(`
                SELECT * FROM cl_participants
                FULL OUTER JOIN cl_party_info ON cl_participants.info_id = cl_party_info.id
                WHERE cl_participants.info_id IN (select info_id from cl_participants where call_id = ${id})  
                `);
            } catch(e){
                this.logger.error(`Error get ClPartyInfo info: ${e}`, this.serviceContext);
                throw e;
            }
        
        }

        public async getClPartyInfoByNumber(callerNumber: string, extensionNumber: string): Promise<ClPartyInfo>{
            try {
                return await this.callPartyInfo
                .createQueryBuilder('cl_party_info')
                .select()
                .where("cl_party_info.callerNumber like :callerNumber", {
                    callerNumber: callerNumber,
                })
                .andWhere("cl_party_info.didNumber like :extensionNumber", {
                    extensionNumber: extensionNumber,
                })
                .orderBy("cl_party_info.id", "DESC")
                .getOne();
            } catch(e){
                this.logger.error(`Error get callInfo : ${e}`, this.serviceContext);
                throw e;
            }
        } 

        public async getRecord(id: number): Promise<Array<{recording_url : string | null}>>{
            try {
                return await this.callParticipants.query(`
                SELECT recording_url FROM cl_participants WHERE call_id = (SELECT call_id FROM cl_participants WHERE info_id = ${id}) ORDER BY id DESC LIMIT 1;
                `);
            } catch(e){
                this.logger.error(`Error get getRecord : ${e}`, this.serviceContext);
                throw e;
            }
        }
}

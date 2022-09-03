import { LoggerService } from '@app/logger/logger.service';
import { UtilsService } from '@app/utils/utils.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ReadStream } from 'fs';

@Injectable()
export class RecordsService {
    private serviceContext: string;
    constructor(
        private readonly configService: ConfigService,
        private readonly  logger: LoggerService
    ){
        this.serviceContext = RecordsService.name;
    }

    public async getRecord(filename: string): Promise<ReadStream>{
        try {
            return await this._getRecord(filename)
        }catch(e){
            this.logger.error(e, this.serviceContext);
            throw e;
        }
    }

    private async _getRecord(filename: string){
        try {
            const filePath = this.getFullRecordPath(filename);
            const isFileExist = await UtilsService.exists(filePath);
            if(!isFileExist) throw 'Запрашиваемый файл отсутствует или проблемы с шарингом, попробуйте позже';
            return UtilsService.readStreamVoiceFile(filePath)
        }catch(e){
            this.logger.error(e, this.serviceContext);
            throw e;
        }
    }

    private getFullRecordPath(filename: string): string{
        return `${this.configService.get('windowsSharePath')}${filename}`
    }
}

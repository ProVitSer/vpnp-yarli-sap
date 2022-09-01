import { HttpExceptionFilter } from '@app/http-exception.filter';
import { Controller, Get, HttpException, HttpStatus, Param, Res, UseFilters } from '@nestjs/common';
import { Response } from 'express'
import { RecordsService } from './records.service';

@UseFilters(HttpExceptionFilter)
@Controller()
export class RecordsController {
    constructor(
        private readonly records: RecordsService
    ) {}


    @Get('records/:RECORD_PATH/:RECORD_NAME')
    async getRecord(@Param('RECORD_PATH') recordPath: string, @Param('RECORD_NAME') record: string, @Res() res: Response): Promise<any> {
        try {
            const file = await this.records.getRecord(`${recordPath}/${record}`)
            res.setHeader('Content-disposition', `attachment; filename=${record}`);
            file.pipe(res);
        }catch(e){
            throw new HttpException( e , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

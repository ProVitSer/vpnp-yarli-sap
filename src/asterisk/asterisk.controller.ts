import { HttpExceptionFilter } from '@app/http-exception.filter';
import { Body, Controller, Post, Req, Res, UseFilters, HttpStatus } from '@nestjs/common';
import { SendCall } from './dto/send-call.dto';
import { Request, Response } from 'express'
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { AsteriskService } from './asterisk.service';

@UseFilters(HttpExceptionFilter)
@Controller()
export class AsteriskController {
    constructor(
        private readonly asterisk: AsteriskService
    ){}

    @Post('call')
    async sendSms(@Req() req: Request, @Body() body: SendCall, @Res() res: Response) {
        try {
            const result = await this.asterisk.sendAmiCall(body)
            return res.status(HttpStatus.OK).json({ message: "Успешно" });
        }catch(e){
            throw new HttpException( e , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

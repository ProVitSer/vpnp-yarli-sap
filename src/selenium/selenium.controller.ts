import { HttpExceptionFilter } from '@app/http-exception.filter';
import { Controller, Post, UseFilters, HttpStatus, Req, Body, Res } from '@nestjs/common';
import { Request, Response } from 'express'
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Status } from './dto/status.dto';
import { SeleniumProvider } from './selenium.provider';
import { ActionType } from './types/type';

@UseFilters(HttpExceptionFilter)
@Controller()
export class SeleniumController {
    constructor(
       private readonly selenium: SeleniumProvider 
    ) {}

    @Post('status')
    async changeStatus(@Req() req: Request, @Body() body: Status, @Res() res: Response) {
        try {
            const result = await this.selenium.change(ActionType.changePbxExtensionStatus, body)
            return res.status(HttpStatus.OK).json({ message: "Успешно" });
        }catch(e){
            throw new HttpException( e , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

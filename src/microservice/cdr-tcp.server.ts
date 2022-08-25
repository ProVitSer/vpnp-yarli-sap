import { LoggerService } from '@app/logger/logger.service';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { OnGatewayInit } from '@nestjs/websockets';
import * as net from 'net';
import { Socket } from 'net';
import { Server as TcpServer } from 'net';
import { CdrService } from './cdr.service';


@Injectable()
export class CdrTcpServer implements OnApplicationBootstrap{
    public server: TcpServer;
    constructor(
        private readonly configService: ConfigService,
        private readonly logger: LoggerService,
        private readonly cdrService: CdrService
    ){}

    
    public onApplicationBootstrap() {
        this.initListenTCP();
    }

    private async initListenTCP(){
        const { port, host } = this.configService.get('tcpServer');
        this.server = net.createServer((connection: Socket) => {
            this.logger.info('TCP Server init');
            connection.on('data', async (data: Buffer) => {
                await this.notifyCallInfo(data);
                console.log('end data')
            });

        }).listen({port, host});

        this.server.on('error', (e: any) => {
            if (e.code == 'EADDRINUSE') {
                this.logger.error(`Address or port ${port} in use, retrying...`);
                setTimeout(() => {
                    this.server.close();
                    this.server.listen(port);
                }, 5000);
            } else {
                this.logger.error(e);
            }
        });
      
        this.server.on('close', () => {
            this.logger.info('Connection closed!');
        });
    }

    private async notifyCallInfo(data: Buffer){
        const cdr = data.toString().replace(/[\r\n]/g, "").split(",");
        this.logger.info(`Получены CDR данные от АТС ${cdr}`);
        return await this.cdrService.notifyCallInfo(cdr);
    }


}

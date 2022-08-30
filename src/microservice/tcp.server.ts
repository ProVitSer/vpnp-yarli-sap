import { CdrService } from '@app/cdr/cdr.service';
import { LoggerService } from '@app/logger/logger.service';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as net from 'net';
import { Socket, Server } from 'net';


@Injectable()
export class TcpServer implements OnApplicationBootstrap{
    public server: Server;
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

    public async notifyCallInfo(data: Buffer | string){
        const cdr = data.toString().replace(/[\r\n]/g, "").split(",");
        this.logger.info(`Получены CDR данные от АТС ${cdr}`);
        return await this.cdrService.notifyCallInfo(cdr);
    }


}

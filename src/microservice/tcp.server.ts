import { CdrService } from '@app/cdr/cdr.service';
import { LoggerService } from '@app/logger/logger.service';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as net from 'net';
import { Socket, Server } from 'net';


@Injectable()
export class TcpServer implements OnApplicationBootstrap{
    public server: Server;
    private serviceContext: string;
    constructor(
        private readonly configService: ConfigService,
        private readonly logger: LoggerService,
        private readonly cdrService: CdrService
    ){
        this.serviceContext = TcpServer.name;
    }

    
    public onApplicationBootstrap() {
        this.initListenTCP();
    }

    private async initListenTCP(){
        const { port, host } = this.configService.get('tcpServer');
        this.server = net.createServer((connection: Socket) => {
            this.logger.info('TCP Server init', this.serviceContext);
            connection.on('data', async (data: Buffer) => {
                await this.notifyCallInfo(data);
            });

        }).listen({port, host});

        this.server.on('error', (e: any) => {
            if (e.code == 'EADDRINUSE') {
                this.logger.error(`Address or port ${port} in use, retrying...`, this.serviceContext);
                setTimeout(() => {
                    this.server.close();
                    this.server.listen(port);
                }, 5000);
            } else {
                this.logger.error(e, this.serviceContext);
            }
        });
      
        this.server.on('close', () => {
            this.logger.info('Connection closed!', this.serviceContext);
        });
    }

    public async notifyCallInfo(data: Buffer | string){
        const cdr = data.toString().replace(/[\r\n]/g, "").split(",");
        this.logger.info(`Получены CDR данные от АТС ${cdr}`, this.serviceContext);
        return await this.cdrService.notifyCallInfo(cdr);
    }


}

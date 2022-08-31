import { LoggerService } from '@app/logger/logger.service';
import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


export interface PlainObject { [key: string]: any }


@Injectable()
export class AsteriskAmi implements OnApplicationBootstrap {
    private client: any;
    

    constructor(
        @Inject('AMI') private readonly ami : any,
        private readonly configService: ConfigService,
        private readonly logger: LoggerService,
    ) {
    }

    get providers(): any {
        return {

        }
    }

    public async onApplicationBootstrap() {
        try {
            this.client = await this.ami;
            this.client.logLevel = this.configService.get('voip.ami.logLevel');
            this.client.open();
            this.client.on('namiConnected', () => this.logger.info('Подключение к AMI успешно установлено'));
            this.client.on('namiConnectionClose', () => this.connectionClose());
            this.client.on('namiLoginIncorrect', () => this.loginIncorrect());
            this.client.on('namiInvalidPeer', () => this.invalidPeer());
        } catch (e) {
            this.logger.error(`AMI onApplicationBootstrap ${e}`)
        }

    };


    public async amiClientSend<T>(action : any): Promise<T> {
        return await new Promise((resolve) =>{
            this.client.send(action, (event: any) => {
                this.logger.info(event);
                resolve(event);
            });
        })
    }

    private connectionClose() {
        this.logger.error(`Переподключение к AMI ...`);
        setTimeout(() => {
            this.client.open();
        }, 5000);
    }

    private loginIncorrect() {
        this.logger.error(`Некорректный логин или пароль от AMI`);
       // process.exit();
    }

    private invalidPeer() {
        this.logger.error(`Invalid AMI Salute. Not an AMI?`);
       // process.exit();
        
    }
 
    
}

import * as uuid from "uuid";
import * as moment from 'moment';
import { createReadStream, access, constants } from 'fs';



export class UtilsService {
    
    static generateId(needUuid?: boolean): string {
        if(!!needUuid){
            return uuid.v4();
        }else {
            return Date.now().toString(36) + Math.random().toString(36).substring(2);
        }
    }

    static formateDate(date: string){
        return moment(new Date(date)).add(3, 'hour').format('YYYY-MM-DD H:mm:ss');
    }

    static readStreamVoiceFile( filePath: string){
        return createReadStream(filePath);
    }

    static exists(path: string): Promise<boolean> { 
        return new Promise((resolve) => {
            access(path, constants.F_OK, error  => {
                if (error) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            })
        }) 
    }
}


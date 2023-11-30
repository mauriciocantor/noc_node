import {LogRepository} from "../../repository/log.repository";
import {LogEntity, LogSeverityLevel} from "../../entities/log.entity";


interface CheckServiceMultipleUseCase {
    execute( url: string): Promise<boolean>
}

type SuccessCallback = (()=>void)|undefined;
type ErrorCallBack = ((error:string)=>void)|undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback?:SuccessCallback,
        private readonly errorCallBack?:ErrorCallBack,
    ) {

    }

    private callLogs ( log: LogEntity) {
        this.logRepository.forEach(logRepository=>{
            logRepository.saveLog(log);
        })
    }

    async execute(url: string) : Promise<boolean>{
        const origin = 'checkService.ts';
        try{
            const req = await  fetch(url);
            if(!req.ok){
                throw new Error(`Error on check service ${url}`);
            }
            const log = new LogEntity({
                message: `Service ${url} working`,
                level: LogSeverityLevel.low,
                origin
            });

            await this.callLogs(log);
            this.successCallback && this.successCallback();
            return true;
        }catch (error) {
            const errorMessage = `${url} is not ok.  | ${error}`;
            const log = new LogEntity({
                message: errorMessage,
                level: LogSeverityLevel.high,
                origin
            });

            await this.callLogs(log)
            this.errorCallBack && this.errorCallBack(errorMessage);
            return false;
        }
    }
}
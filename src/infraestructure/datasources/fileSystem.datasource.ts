import {LogDatasource} from "../../domain/datasources/log.datasource";
import {LogEntity, LogSeverityLevel} from "../../domain/entities/log.entity";
import * as fs from "fs";

export class FileSystemDatasource implements LogDatasource{

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.logs';
    private readonly mediumLogsPath = 'logs/logs-medium.logs';
    private readonly highLogsPath = 'logs/logs-high.logs';

    constructor() {
        this.createLogsFile();
    }

    private createLogsFile = ()=>{
        if(!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath);
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach((path)=>{
            if(!fs.existsSync(path)){
                fs.writeFileSync(path, '');
            }
        });
    }

    private getLogsFromFile = (path:string):LogEntity[]=>{
        const content = fs.readFileSync(path, 'utf-8');
        return content.split('\n')
            .filter(log=>(log))
            .map(log => LogEntity.fromJson(log));
    }

    async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);
            default:
                throw new Error(`${severityLevel} not implemented`);
        }
    }

    async saveLog(log: LogEntity): Promise<void> {
        const logAsJson = `${ JSON.stringify(log) }\n`;

        fs.appendFileSync(this.allLogsPath, logAsJson);

        if(log.level == LogSeverityLevel.low) return;

        if(log.level == LogSeverityLevel.medium){
            fs.appendFileSync(this.mediumLogsPath, logAsJson);
        }else{
            fs.appendFileSync(this.highLogsPath, logAsJson);
        }
    }

}
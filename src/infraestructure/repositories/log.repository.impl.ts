import {LogRepository} from "../../domain/repository/log.repository";
import {LogEntity, LogSeverityLevel} from "../../domain/entities/log.entity";
import {LogDatasource} from "../../domain/datasources/log.datasource";


export class LogRepositoryImpl implements LogRepository{


    private readonly logDatasource: LogDatasource;

    constructor(
        logDatasource: LogDatasource,
    ) {
        this.logDatasource = logDatasource;
    }
    async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return await this.logDatasource.getLog(severityLevel);
    }

    async saveLog(log: LogEntity): Promise<void> {
        await this.logDatasource.saveLog(log);
    }

}

//con abstract se obliga al comportamiento que se defina y no permite instanciar la clase
import {LogEntity, LogSeverityLevel} from "../entities/log.entity";

export abstract class LogDatasource {
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
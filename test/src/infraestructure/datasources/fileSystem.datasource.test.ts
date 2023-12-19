import * as fs from "fs";
import * as path from "node:path";
import {FileSystemDatasource} from "../../../../src/infraestructure/datasources/fileSystem.datasource";
import {LogEntity, LogSeverityLevel} from "../../../../src/domain/entities/log.entity";

describe("fileSystem.datasource.ts", ()=>{
    const logPath =  path.join(__dirname,'../../../../logs');

    beforeEach(()=>{
        fs.rmSync(logPath, {recursive:true, force:true});
    });

    test("Should create log files if they do not exists", ()=>{
        new FileSystemDatasource();

        const files = fs.readdirSync(logPath);

        expect(files).toEqual([ 'logs-all.logs', 'logs-high.logs', 'logs-medium.logs' ]);

    });

    test("Should save a log in logs-all.log", ()=>{
        const logDataSource = new FileSystemDatasource();
        const log = new LogEntity({
            level: LogSeverityLevel.low,
            message: "test",
            origin: "fileSystem.datasource.test.ts"
        });

        logDataSource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.logs`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));
    });

    test("Should save a log in logs-all.log and logs-medium.logs", ()=>{
        const logDataSource = new FileSystemDatasource();
        const log = new LogEntity({
            level: LogSeverityLevel.medium,
            message: "test",
            origin: "fileSystem.datasource.test.ts"
        });

        logDataSource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.logs`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.logs`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toContain(JSON.stringify(log));
    });

    test("Should save a log in logs-all.log and logs-high.logs", ()=>{
        const logDataSource = new FileSystemDatasource();
        const log = new LogEntity({
            level: LogSeverityLevel.high,
            message: "test",
            origin: "fileSystem.datasource.test.ts"
        });

        logDataSource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.logs`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-high.logs`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toContain(JSON.stringify(log));
    });

    test("Should return all logs", async()=>{
        const logDataSource = new FileSystemDatasource();
        const logLow = new LogEntity({
            level: LogSeverityLevel.low,
            message: "low-log",
            origin: "fileSystem.datasource.test.ts"
        });
        const logMedium = new LogEntity({
            level: LogSeverityLevel.medium,
            message: "medium-log",
            origin: "fileSystem.datasource.test.ts"
        });
        const logHigh = new LogEntity({
            level: LogSeverityLevel.high,
            message: "high-log",
            origin: "fileSystem.datasource.test.ts"
        });

        await logDataSource.saveLog(logLow);
        await logDataSource.saveLog(logMedium);
        await logDataSource.saveLog(logHigh);

        const resultLogLow =  await logDataSource.getLog(LogSeverityLevel.low);
        const resultLogMedium = await logDataSource.getLog(LogSeverityLevel.medium);
        const resultLogHigh = await logDataSource.getLog(LogSeverityLevel.high);

        expect(resultLogLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]));
        expect(resultLogMedium).toEqual(expect.arrayContaining([logMedium]));
        expect(resultLogHigh).toEqual(expect.arrayContaining([logHigh]));
    });
});
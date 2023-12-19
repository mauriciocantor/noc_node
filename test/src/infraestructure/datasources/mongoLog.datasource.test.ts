import {LogModel, MongoDatabase} from "../../../../src/data/mongo";
import {envs} from "../../../../src/config/plugins/envs.plugin";
import mongoose from "mongoose";
import {MongoLogDatasource} from "../../../../src/infraestructure/datasources/mongoLog.datasource";
import {LogEntity, LogSeverityLevel} from "../../../../src/domain/entities/log.entity";


describe("mongoLog", ()=>{
    const logDataSource = new MongoLogDatasource();
    const log = new LogEntity({
        level: LogSeverityLevel.medium,
        message: 'test message',
        origin: `mongoLog.datasource.test.ts`
    });

    beforeAll(async ()=>{
        jest.clearAllMocks();
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        })
    });

    afterAll(async ()=> {
        mongoose.connection.close();
    });

    afterEach(async ()=>{
        await LogModel.deleteMany();
    })

    test("Should create a log mongo",async ()=>{


        const logSpy = jest.spyOn(console, 'log');

        await logDataSource.saveLog(log);

        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith(expect.any(String));
    });

    test("Should get log mongo",async ()=>{
        await logDataSource.saveLog(log);

        const logs = await logDataSource.getLog(LogSeverityLevel.medium);


        expect(logs.length).toBe(1);
        expect(logs[0].level).toBe(LogSeverityLevel.medium);

    });
})
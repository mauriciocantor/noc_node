import {LogRepositoryImpl} from "../../../../src/infraestructure/repositories/log.repository.impl";
import {LogDatasource} from "../../../../src/domain/datasources/log.datasource";
import {LogEntity, LogSeverityLevel} from "../../../../src/domain/entities/log.entity";

describe("log.repository.impl.ts", ()=>{
    const dataSource : LogDatasource = {
        getLog: jest.fn(),
        saveLog: jest.fn()
    }
    const dataRepository = new LogRepositoryImpl(dataSource);

    afterAll(()=>{
        jest.clearAllMocks();
    })

    test("saveLog should call the datasource with arguments", ()=>{
        const spyDS = jest.spyOn(dataSource, 'saveLog');
        const data:LogEntity  = {
            level: LogSeverityLevel.low,
            message: "test implement",
            createdAt: new Date(),
            origin: "logRepositoryImplement"
        }
        dataRepository.saveLog(data);

        expect(spyDS).toHaveBeenCalledWith(data);
        expect(spyDS).toHaveBeenCalled();
    });

    test("getLogs should call the datasource with arguments", ()=>{
        const spyDS = jest.spyOn(dataSource, 'getLog');
        const data  = LogSeverityLevel.low;
        dataRepository.getLog(data);

        expect(spyDS).toHaveBeenCalledWith(data);
        expect(spyDS).toHaveBeenCalled();
    });
});
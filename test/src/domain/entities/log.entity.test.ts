import {LogEntity, LogSeverityLevel} from "../../../../src/domain/entities/log.entity";
import exp = require("node:constants");

describe("log.entity.ts",()=>{
    const dataObj = {
        message: 'Hola Mundo',
        level: LogSeverityLevel.high,
        origin: 'log.entity.test.ts'
    };

    test("Should create a LogEntity instance",()=>{
        const log = new LogEntity(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('Should create a LogEntity instance from json', ()=>{
        const json = `{"message":"Service https://google.com/ working","level":"low","createdAt":"2023-12-12T16:58:36.386Z","origin":"checkService.ts"}`;
        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe("Service https://google.com/ working");
        expect(log.level).toBe(LogSeverityLevel.low);
        expect(log.origin).toBe("checkService.ts");
        expect(log.createdAt).toBeInstanceOf(Date);
    });


    test('Should create a LogEntity instance from Object', ()=>{
        const log = LogEntity.fromObject(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('Should field message not empty value from Json', ()=>{
        const valueObject = JSON.stringify({...dataObj, message: null});
        try {
            const log = LogEntity.fromJson(valueObject);
        }catch (e) {
            expect(`${e}` ).toEqual('Error: Message can not empty');
        }
    });

    test('Should field level not empty value from Json', ()=>{
        const valueObject = JSON.stringify({...dataObj, level: null});
        try {
            const log = LogEntity.fromJson(valueObject);
        }catch (e) {
            expect(`${e}` ).toEqual('Error: Level can not empty');
        }
    });

    test('Should field origin not empty value from Json', ()=>{
        const valueObject = JSON.stringify({...dataObj, origin: null});
        try {
            const log = LogEntity.fromJson(valueObject);
        }catch (e) {
            expect(`${e}` ).toEqual('Error: Origin can not empty');
        }
    });

    test('Should field createdAt not empty value from Json', ()=>{
        const valueObject = JSON.stringify({...dataObj, createdAt: null});
        try {
            const log = LogEntity.fromJson(valueObject);
        }catch (e) {
            expect(`${e}` ).toEqual('Error: CreatedAt can not empty');
        }
    });
})
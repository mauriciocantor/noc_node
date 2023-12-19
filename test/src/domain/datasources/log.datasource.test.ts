import {LogDatasource} from "../../../../src/domain/datasources/log.datasource";
import {LogEntity, LogSeverityLevel} from "../../../../src/domain/entities/log.entity";

describe("log.datasource.ts", () => {
    const newLog = new LogEntity({
        origin: "log.datasource.test.ts",
        message: "test-message",
        level: LogSeverityLevel.low
    });
    class MockLogDatasource implements LogDatasource {
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        }
    }

    test("Should test the abstract class",async ()=>{
        const mockLogDatasource = new MockLogDatasource();

        expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
        expect(mockLogDatasource).toHaveProperty('saveLog');
        expect(mockLogDatasource).toHaveProperty('getLog');

        await mockLogDatasource.saveLog(newLog);

        const logs = await mockLogDatasource.getLog(LogSeverityLevel.low);
        expect(logs).toHaveLength(1);
        expect(logs[0]).toEqual(newLog);

    });
});
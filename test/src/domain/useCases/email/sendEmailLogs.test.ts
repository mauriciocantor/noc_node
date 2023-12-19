import {SendEmailLogs} from "../../../../../src/domain/useCases/email/sendEmailLogs";
import {LogRepository} from "../../../../../src/domain/repository/log.repository";
import {LogEntity} from "../../../../../src/domain/entities/log.entity";

describe("sendEmailLogs.ts", ()=>{

    const mockEmailService = {
        sendEmailWithFileSystemLogs:jest.fn().mockReturnValue(true)
    };
    const mockLogRepository:LogRepository = {
        saveLog: jest.fn(),
        getLog: jest.fn(),
    };
    const mockSendEmailLog = new SendEmailLogs(
        mockEmailService as any ,
        mockLogRepository
    );

    beforeAll(()=> {
        jest.clearAllMocks();
        //jest.resetAllMocks();
    });

    test("Should call sendEmail and saveLog", async ()=>{

        const result = await mockSendEmailLog.execute('mauricio.cantor.p@hotmail.com');

        expect(result).toBe(true);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toBeCalledTimes(1);
        expect(mockLogRepository.saveLog).toBeCalledWith(expect.any(LogEntity));

    });

    test("Should log in case of error", async ()=>{
        mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false);
        const result = await mockSendEmailLog.execute('mauricio.cantor.p@google.com');

        expect(result).toBe(false);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toBeCalledTimes(2);
        expect(mockLogRepository.saveLog).toBeCalledWith(expect.any(LogEntity));

    });
})
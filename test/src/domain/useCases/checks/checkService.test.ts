import {CheckService} from "../../../../../src/domain/useCases/checks/checkService";
import {LogEntity} from "../../../../../src/domain/entities/log.entity";

describe("CheckService UseCase", ()=>{
    const mockRepository = {
        saveLog: jest.fn(),
        getLog: jest.fn()
    }

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckService(
        mockRepository,
        successCallback,
        errorCallback
    );

    beforeAll(()=>jest.clearAllMocks());
    afterAll(()=>jest.resetAllMocks());

    test("Should call successCallback when fetch returns true ", async ()=>{

        const wasOk = await checkService.execute('https://google.com.co');

        expect(wasOk).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    });

    test("Should call errorCallback when fetch returns false ", async ()=>{

        const wasOk = await checkService.execute('https://gooasdaadasdasdgle.com.co');

        expect(wasOk).toBe(false);
        expect(errorCallback).toHaveBeenCalled();
        //expect(successCallback).not.toHaveBeenCalled();
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    })
});
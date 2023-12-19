import {CronService} from "../../../../src/presentation/cron/cronService";

describe("Cron Service", ()=>{
    const mockTick = jest.fn();
    test("Should create a job", ()=>{

        const job = CronService.createJob('* * * * * *', mockTick);

        setTimeout(()=>{
            expect(mockTick).toBeCalledTimes(2);
            job.stop();

        }, 2000);

    });
});
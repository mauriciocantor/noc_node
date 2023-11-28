import {EmailService} from "../../../presentation/email/email.service";
import {LogRepository} from "../../repository/log.repository";
import {LogEntity, LogSeverityLevel} from "../../entities/log.entity";


interface SendLogsEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>;
}


export class SendEmailLogs implements SendLogsEmailUseCase{

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ) {
    }

    async execute(to: string | string[]): Promise<boolean> {

        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
            if(!sent){
                throw new Error('Email log not sent');
            }
            const log = new LogEntity({
                message: `Log Email Sent`,
                origin: 'sendEmailLogs',
                level: LogSeverityLevel.low
            });

            await this.logRepository.saveLog(log);
            return true;
        }catch (e) {
            const log = new LogEntity({
                message: `${e}`,
                origin: 'sendEmailLogs',
                level: LogSeverityLevel.high
            });

            await this.logRepository.saveLog(log);

            return false;
        }
    }

}
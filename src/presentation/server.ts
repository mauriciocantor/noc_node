// import {CronService} from "./cron/cronService";
// import {CheckService} from "../domain/useCases/checks/checkService";
// import {LogRepositoryImpl} from "../infraestructure/repositories/log.repository.impl";
// import {FileSystemDatasource} from "../infraestructure/datasources/fileSystem.datasource";
// import {EmailService} from "./email/email.service";
// import {SendEmailLogs} from "../domain/useCases/email/sendEmailLogs";

/*const systemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);*/

// const emailService = new EmailService();
export class Server {
    public static start(){
        console.log('Server Started...');

        //Envio de emails

        // new SendEmailLogs(emailService,systemLogRepository)
        //     .execute(['mauricio.cantor.p@hotmail.com', 'topomajor1@hotmail.com'])

        /*emailService.sendEmail({
            to: "mauricio.cantor.p@hotmail.com",
            subject: "prueba",
            htmlBody: `
<h3> Logs de sistema - NOC</h3>
<p>Texto de prueba</p>
<p>Ver Logs enviados</p>
`
        });*/
        //Envio de emails con adjuntos
        // emailService.sendEmailWithFileSystemLogs(['mauricio.cantor.p@hotmail.com', 'topomajor1@hotmail.com']);


        /*const url = 'https://google.com/';
        // const url = 'http://localhost:3000/';
        CronService.createJob('*!/5 * * * * *', ()=>{
            new CheckService(
                systemLogRepository,
                ()=>console.log(`Servicio ${url} is ok!!`), // se pueden obviar estos callbacks
                (error)=>console.log(error) // se pueden obviar estos callbacks
            ).execute(url);
            // new CheckService().execute('http://localhost:3000/');
        });*/

        /*CronService.createJob('*!/3 * * * * *', ()=>{
            const date = new Date();
            console.logs('3 seconds', date)
        });

        CronService.createJob('*!/2 * * * * *', ()=>{
            const date = new Date();
            console.logs('2 seconds', date)
        });*/

    }
}
import {CronService} from "./cron/cronService";
import {CheckService} from "../domain/useCases/checks/checkService";
import {LogRepositoryImpl} from "../infraestructure/repositories/log.repository.impl";
import {FileSystemDatasource} from "../infraestructure/datasources/fileSystem.datasource";

const systemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);
export class Server {
    public static start(){
        console.log('Server Started...');

        const url = 'https://google.com/';
        // const url = 'http://localhost:3000/';
        CronService.createJob('*/5 * * * * *', ()=>{
            new CheckService(
                systemLogRepository,
                ()=>console.log(`Servicio ${url} is ok!!`), // se pueden obviar estos callbacks
                (error)=>console.log(error) // se pueden obviar estos callbacks
            ).execute(url);
            // new CheckService().execute('http://localhost:3000/');
        });

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
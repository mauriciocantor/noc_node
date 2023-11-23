import {CronService} from "./cron/cronService";
import {CheckService} from "../domain/useCases/checks/checkService";

export class Server {
    public static start(){
        console.log('Server Started...');

        const url = 'https://google.com/';
        CronService.createJob('*/5 * * * * *', ()=>{
            new CheckService(
                ()=>console.log(`Servicio ${url} is ok!!`),
                (error)=>console.log(error)
            ).execute(url);
            // new CheckService().execute('http://localhost:3000/');
        });

        /*CronService.createJob('*!/3 * * * * *', ()=>{
            const date = new Date();
            console.log('3 seconds', date)
        });

        CronService.createJob('*!/2 * * * * *', ()=>{
            const date = new Date();
            console.log('2 seconds', date)
        });*/

    }
}
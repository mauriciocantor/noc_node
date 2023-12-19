import nodemailer from 'nodemailer';
import {envs} from "../../config/plugins/envs.plugin";

export interface Attachment {
    filename: string;
    path: string;

}

export interface SendMailOptions {
    to: string|string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[]
}
export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth:{
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    async sendEmail(options:SendMailOptions):Promise<boolean>{
        const {to, subject, htmlBody, attachments=[]} = options;

        try {
           const sentInformation = await this.transporter.sendMail({
               to,
               subject,
               html: htmlBody,
               attachments
           });

           console.log(sentInformation);
            return true;

        }catch (e) {
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string| string[]){
        const subject = 'Logs del servidor';
        const htmlBody= `
<h3> Logs de sistema - NOC</h3>
<p>Texto de prueba</p>
<p>Ver Logs enviados</p>
`;

        const attachments:Attachment[] = [
            {filename: 'logs-all.logs', 'path':'./logs/logs-all.logs'},
            {filename: 'logs-high.logs', 'path':'./logs/logs-high.logs'},
            {filename: 'logs-medium.logs', 'path':'./logs/logs-medium.logs'},
        ];

        return this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments
        });
    }
}
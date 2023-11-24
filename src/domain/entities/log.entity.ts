
export enum LogSeverityLevel{
    low= 'low',
    medium='medium',
    high = 'high'
}

interface LogEntityInterface {
    message:string;
    level: LogSeverityLevel;
    createdAt?: Date;
}

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;

    constructor({message, level, createdAt=new Date()}:LogEntityInterface ) {
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
    }

    static fromJson(json:string):LogEntity{
        const {message, level, createdAt} = JSON.parse(json);

        if(!message) throw new Error('Message can not empty');
        if(!level) throw new Error('Level can not empty');
        if(!createdAt) throw new Error('CreatedAt can not empty');

        const log = new LogEntity({message, level});
        log.createdAt = new Date(createdAt);

        return log;
    }

}
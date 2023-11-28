
export enum LogSeverityLevel{
    low= 'low',
    medium='medium',
    high = 'high'
}

interface LogEntityInterface {
    message:string;
    level: LogSeverityLevel;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options:LogEntityInterface ) {
        const {
            message,
            level,
            origin,
            createdAt = new Date()
        } = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson(json:string):LogEntity{
        const {message, level, createdAt, origin} = JSON.parse(json);

        if(!message) throw new Error('Message can not empty');
        if(!level) throw new Error('Level can not empty');
        if(!origin) throw new Error('Origin can not empty');
        if(!createdAt) throw new Error('CreatedAt can not empty');

        return new LogEntity({message, level, createdAt, origin});
    }

}
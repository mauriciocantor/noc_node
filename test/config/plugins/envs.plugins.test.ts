import {envs} from "../../../src/config/plugins/envs.plugin";

describe('envs.plugins.ts', ()=>{
    test('Should return env options', ()=>{
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_EMAIL: 'topomajor@gmail.com',
            MAILER_SECRET_KEY: 'rjzduduotsawjwme',
            PROD: false,
            MAILER_SERVICE: 'gmail',
            MONGO_URL: 'mongodb://mauricio:123456789@localhost:27018',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'mauricio',
            MONGO_PASS: '123456789',
            POSTGRES_URL: 'postgresql://mauricio:123456789@localhost:5433/NOC',
            POSTGRES_DB: 'NOC-TEST',
            POSTGRES_USER: 'mauricio',
            POSTGRES_PASS: '123456789'
        });
    });

    test('Should return error if not found env', ()=>{
        expect(envs).not.toContain('NOC');
    });
});
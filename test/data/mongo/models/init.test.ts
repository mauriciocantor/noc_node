import {MongoDatabase} from "../../../../src/data/mongo";
import {envs} from "../../../../src/config/plugins/envs.plugin";

describe('init.test.ts', ()=>{
    test('Should connect to mongo db',  async ()=>{
        const {MONGO_URL: mongoUrl, MONGO_DB_NAME: dbName} = envs;
        const connected = await MongoDatabase.connect({
            mongoUrl,
            dbName
        });

        expect(connected).toBe(true);
    });

    test('Should return error not connect db', ()=>{
        const connected = await MongoDatabase.connect({
            mongoUrl,
            dbName
        });

        expect(connected).toBe(true);
    });
});
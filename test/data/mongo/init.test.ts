import {MongoDatabase} from "../../../src/data/mongo";
import {envs} from "../../../src/config/plugins/envs.plugin";
import mongoose from "mongoose";

describe('init.test.ts MongoDB', ()=>{
    afterAll(()=>{
        mongoose.connection.close();
    });

    const {MONGO_URL: mongoUrl, MONGO_DB_NAME: dbName} = envs;
    test('Should connect to mongo db',  async ()=>{
        const connected = await MongoDatabase.connect({
            mongoUrl,
            dbName
        });

        expect(connected).toBe(true);
    });

    test('Should return error not connect db', async ()=>{
        try {
            const connected = await MongoDatabase.connect({
                mongoUrl:"mongodb://mauricio:123456@localhostassdas:27017",
                dbName
            });
            expect(connected).toBe(true);
        }catch (e) {

        }

    });
});
import { config } from 'dotenv';
config();
import { Container } from "inversify";
import "reflect-metadata";
import ormconfig from "./app/database/ormconfig.config";
import { ExpressApplication } from "./app";
import InversifyContainer from './app/di-container'
async function bootStrap()
{
    const application = new ExpressApplication(InversifyContainer);
    const appPort = process.env.APP_PORT;
    const applicationInstance = application.getApplicationInstance();
    try
    {
        application.createDBConnection(ormconfig);
        console.log('======Connected to the Database========');
        applicationInstance.listen(appPort);
        console.log(`======Server started on port ${appPort}======`);
    
    }
    catch(error)
    {
        console.error(error.message)
    }
}

bootStrap();
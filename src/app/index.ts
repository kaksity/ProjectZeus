import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { createConnection } from "typeorm";
import './http/controllers';

export class ExpressApplication
{
    public server:InversifyExpressServer;

    constructor(container: Container) {
        this.server = new InversifyExpressServer(container);
        this.configureApplication();
    }

    private async configureApplication()
    {
        this.server.setConfig((application) => {
            
        });
    }
    public async createDBConnection(options)
    {
        await createConnection(options);
    }
    public getApplicationInstance()
    {
        return this.server.build();
    }
}
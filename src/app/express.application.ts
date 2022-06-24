import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { createConnection } from "typeorm";
import './http/controllers';
import { HttpException } from "./http/exceptions";
import { json } from "express";
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
            application.use(json());
        });
        this.server.setErrorConfig((application) => {
            // console.log(error instanceof HttpException == true)
            application.use((error, req,res,next) => 
            {
                if(error instanceof HttpException)
                {
                    
                    return res.status(error.code).json({
                        message: error.message,
                        statusCode: error.code
                    });
                }
                console.log(error);
                return res.status(500).json({
                    message: 'Something went wrong. Try again'
                });
            });
        })
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
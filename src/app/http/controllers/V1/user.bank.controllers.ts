import { Request, Response } from "express";
import { controller, httpDelete, httpPost, httpPut, request, response } from "inversify-express-utils";

@controller('api/v1/my/banks')
export class UserBankController
{
    @httpPost('/')
    public async store(@request() req: Request, @response() res: Response)
    {

    }
    @httpPut('/:id')
    public async update(@request() req: Request, @response() res: Response)
    {

    }
    @httpDelete('/:id')
    public async destory(@request() req: Request, @response() res: Response)
    {

    }
}
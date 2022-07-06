import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, request, response } from 'inversify-express-utils';
import { TYPES } from '../../../constants';
import { UtilityService } from '../../../services';
import { HttpException } from '../../exceptions';
import { IResponse } from '../../resources';
@controller('/api/v1')
export class WelcomeController
{   
    @httpGet('/')
    public async getTest(@request() req: Request, @response() res: Response)
    {
        const response: IResponse = {
            message: 'Welcome to X Pay',
            statusCode: 200
        }
        return res.status(response.statusCode).json(response);
    }
}
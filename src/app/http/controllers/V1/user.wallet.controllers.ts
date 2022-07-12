import { Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, request, response } from "inversify-express-utils";
import { TYPES } from "../../../constants";
import { UserWalletService } from "../../../services/user.wallet.service";
import { HttpException } from "../../exceptions";
import { AuthenticatedRequest } from "../../requests/authentication";
import { IResponse } from "../../resources";
import { UserWalletResource } from "../../resources/user.wallet.resource";

@controller('/api/v1/my/wallets')
export class UserWalletController
{

    private userWalletService: UserWalletService;
    /**
     *
     */
    constructor(@inject(TYPES.UserWalletService) userWalletService: UserWalletService) {
        this.userWalletService = userWalletService;
    }

    @httpGet('/', TYPES.AuthenticationMiddleware)
    public async index(@request() req: AuthenticatedRequest, @response() res: Response)
    {
        const user = req.user;
        const wallets = await this.userWalletService.getAllUserWallet(user);
        const response: IResponse = {
            message: 'Retrieved list of user wallets',
            statusCode: 200,
            data: UserWalletResource.collection(wallets),
        }

        return res.status(response.statusCode).json(response);
    }

    @httpPost('/', TYPES.AuthenticationMiddleware)
    public async store(@request() req: AuthenticatedRequest, @response() res: Response)
    {
        const user = req.user;
        await this.userWalletService.createWallet(req.body, user);
        
        const response: IResponse = {
            statusCode: 201,
            message: 'Wallet was created successfully'
        };

        return res.status(response.statusCode).json(response);
    }
    @httpDelete('/:id', TYPES.AuthenticationMiddleware)
    public async destroy(@request() req: AuthenticatedRequest, @response() res: Response)
    {
        const wallet = await this.userWalletService.getWalletById(req.params.id);
        
        if(wallet == null)
        {
            throw new HttpException('Wallet does not exist', 404);
        }

        await this.userWalletService.deleteWallet(wallet);

        const response: IResponse = {
            statusCode: 200,
            message: 'Wallet was deleted successfully'
        };

        return res.status(response.statusCode).json(response);
    }
}
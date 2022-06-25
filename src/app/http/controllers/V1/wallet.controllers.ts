import { Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpPost, request, response } from "inversify-express-utils";
import { TYPES } from "../../../constants";
import { WalletService } from "../../../services/wallet.service";
import { HttpException } from "../../exceptions";
import { AuthenticatedRequest } from "../../requests/authentication";
import { IResponse } from "../../resources";

@controller('/api/v1/wallets')
export class WalletController
{

    private walletService: WalletService;
    /**
     *
     */
    constructor(@inject(TYPES.WalletService) walletService: WalletService) {
        this.walletService = walletService;
    }

    

    @httpPost('/', TYPES.AuthenticationMiddleware)
    public async store(@request() req: AuthenticatedRequest, @response() res: Response)
    {
        const user = req.user;
        await this.walletService.createWallet(req.body, user);
        
        const response: IResponse = {
            statusCode: 201,
            message: 'Wallet was created successfully'
        };

        return res.status(response.statusCode).json(response);
    }
    @httpDelete('/:id', TYPES.AuthenticationMiddleware)
    public async destroy(@request() req: AuthenticatedRequest, @response() res: Response)
    {
        const wallet = await this.walletService.getWalletById(req.params.id);
        
        if(wallet == null)
        {
            throw new HttpException('Wallet does not exist', 404);
        }

        await this.walletService.deleteWallet(wallet);

        const response: IResponse = {
            statusCode: 200,
            message: 'Wallet was deleted successfully'
        };

        return res.status(response.statusCode).json(response);
    }
}
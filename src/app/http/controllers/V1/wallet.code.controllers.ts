import { Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, request, response, TYPE } from "inversify-express-utils";
import { TYPES } from "../../../constants";
import { UserWalletService, UtilityService } from "../../../services";
import { HttpException } from "../../exceptions";
import { AuthenticatedRequest } from "../../requests/authentication";
import { WalletCodeResource } from "../../resources";

@controller('/api/v1/my/wallets')
export class WalletCodeController
{
    private userWalletService: UserWalletService;
    private utilityService: UtilityService;
    /**
     *
     */
    constructor(
        @inject(TYPES.UserWalletService) userWalletService: UserWalletService,
        @inject(TYPES.UtilityService) utilityService: UtilityService,
    ) {
        this.userWalletService = userWalletService;
        this.utilityService = utilityService;
    }

    @httpGet('/:walletId/codes', TYPES.AuthenticationMiddleware)
    public async index(@request() req: AuthenticatedRequest, @response() res: Response)
    {
        const wallet = await this.userWalletService.getWalletById(req.params.walletId);
        console.log(wallet);
        if(wallet == null)
        {
            throw new HttpException('Wallet does not exist', 404);
        }
        
        const walletCodes = await this.userWalletService.getWalletCodes(wallet);
        return WalletCodeResource.collection(walletCodes);
    }
    
    @httpPost('/:walletId/codes', TYPES.AuthenticationMiddleware)
    public async store(@request() req: AuthenticatedRequest, @response() res: Response)
    {

        const user = req.user;
        const wallet = await this.userWalletService.getUserWalletById(req.params.walletId,user);

        if(wallet == null)
        {
            throw new HttpException('Wallet does not exist', 404);
        }

        const code = this.utilityService.generateRandomString();
        
        const walletCode = await this.userWalletService.createWalletCode(code, wallet);
        
        return WalletCodeResource.single(walletCode);
    }

    
}
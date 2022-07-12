import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, request, response, TYPE } from "inversify-express-utils";
import { TYPES } from "../../../constants";
import { UserWalletService } from "../../../services";
import { PaystackService } from "../../../services/paystack.service";
import { HttpException } from "../../exceptions";
import { AuthenticatedRequest } from "../../requests/authentication";
import { IResponse } from "../../resources";

@controller('/api/v1/my/wallet/funds')
export class UserFundWalletController
{
    private paystackService: PaystackService;
    private userWalletService: UserWalletService;

    constructor( 
        @inject(TYPES.PaystackService) paystackService: PaystackService,
        @inject(TYPES.UserWalletService) userWalletService: UserWalletService
    ) {
        this.paystackService = paystackService;
        this.userWalletService = userWalletService;
    }

    @httpPost('/initialize', TYPES.AuthenticationMiddleware)
    public async initialize(@request() req: AuthenticatedRequest, @response() res: Response) 
    {
        const user = req.user;

        const paystackData = {
            email: user.emailAddress,
            amount: req.body.amount * 100,
            metadata: JSON.stringify({
                userId: user.id,
                walletId: req.body.walletId
            })
        }
        
        const data = await this.paystackService.initializePayment(paystackData);
        
        const response: IResponse = {
            message: 'Fund wallet was initialize successfully',
            statusCode: 201,
            data:{
                authorizationUrl: data.authorization_url,
                accessCode: data.access_code,
                reference: data.reference
            }
        }
        return res.status(response.statusCode).json(response);
    }

    @httpPost('/complete', TYPES.AuthenticationMiddleware)
    public async verify(@request() req: AuthenticatedRequest, @response() res: Response)
    {
        
        const data = await this.paystackService.verifyPayment(req.body.referenceCode);

        if(data.status == false)
        {
            throw new HttpException(data.message, 400);
        }

        if(data.gateway_response != 'Successful')
        {
            throw new HttpException('Funding wallet could not be completed', 400);
        }

        const user = req.user;

        const userWallet = await this.userWalletService.getUserWalletById(req.body.walletId, user);

        if(userWallet == null)
        {
            throw new HttpException('Wallet does not exist', 404);
        }

        // Log the funding of the wallet
        
        const amount = parseFloat(data.amount) / 100;
        userWallet.balance = parseFloat(userWallet.balance as any) + parseFloat(amount as any);

        await this.userWalletService.updateWallet(userWallet);

        const response: IResponse = {
            message: 'Wallet was funded successfully',
            statusCode: 201
        }

        return res.status(response.statusCode).json(response);
    }
}
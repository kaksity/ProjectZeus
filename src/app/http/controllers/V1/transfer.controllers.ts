import { Response } from "express";
import { inject } from "inversify";
import { controller, httpPost, request, response } from "inversify-express-utils";
import { TYPES } from "../../../constants";
import { UserWalletService } from "../../../services";
import { TransferService } from "../../../services/transfer.service";
import { HttpException } from "../../exceptions";
import { AuthenticatedRequest } from "../../requests/authentication";
import { IResponse } from "../../resources";

@controller('/api/v1/my/transfers')
export class TransferController
{
    private userWalletService: UserWalletService;
    private transferService: TransferService;
    /**
     *
     */
    constructor(
        @inject(TYPES.UserWalletService) userWalletService: UserWalletService,
        @inject(TYPES.TransferService) transferService: TransferService
    ) {
        this.userWalletService = userWalletService;
        this.transferService = transferService;
    }

    @httpPost('/', TYPES.AuthenticationMiddleware)
    public async store(@request() req: AuthenticatedRequest, @response() res: Response)
    {
        const user = req.user;
        const amount = req.body.amount as number;
        let senderWallet = null;
        let receiverWallet = null;

        if(req.body.senderWalletId)
        {
            senderWallet = await this.userWalletService.getUserWalletById(req.body.senderWalletId, user);
        }
        else if (req.body.senderWalletCode)
        {
            senderWallet = await this.userWalletService.getWalletByWalletCode(req.body.senderWalletCode);
        }
        
        // Check if the sender wallet exist
        if(senderWallet == null)
        {
            throw new HttpException('Sender wallet does not exist', 400);
        }

        
        if(req.body.receiverWalletId)
        {
            receiverWallet = await this.userWalletService.getWalletById(req.body.receiverWalletId);
        }
        if(req.body.receiverWalletCode)
        {
            receiverWallet = await this.userWalletService.getWalletByWalletCode(req.body.receiverWalletCode);
        }

        // Check if the receiver wallet exist
        if(receiverWallet == null)
        {
            throw new HttpException('Receiver wallet does not exist', 400);
        }

        if(senderWallet.balance <= 0)
        {
            throw new HttpException('Wallet Balance is low. You should your wallet', 400);
        }
        
        if(senderWallet.balance < amount)
        {
            throw new HttpException('Wallet Balance is lower that transfer amount. You should your wallet', 400);
        }

        await this.transferService.transfer(senderWallet, receiverWallet, amount);

        const response: IResponse =  {
            statusCode: 201,
            message: 'Transfer was successfully done'
        }

        return res.status(response.statusCode).json(response);
    }
} 
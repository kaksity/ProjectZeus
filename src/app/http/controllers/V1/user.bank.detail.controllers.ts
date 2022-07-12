import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut, request, response } from "inversify-express-utils";
import { TYPES } from "../../../constants";
import { BankService, UserBankService } from "../../../services";
import { HttpException } from "../../exceptions";
import { AuthenticatedRequest } from "../../requests/authentication";
import { IResponse, UserBankResource } from "../../resources";

@controller('/api/v1/my/bank-details')
export class UserBankDetailController
{
    private bankService: BankService;
    private userBankService: UserBankService;
    /**
     *
     */
    constructor(
        @inject(TYPES.BankService) bankService: BankService,
        @inject(TYPES.UserBankService) userBankService: UserBankService
    ) {
        this.bankService = bankService;
        this.userBankService = userBankService;
    }
    @httpGet('/', TYPES.AuthenticationMiddleware)
    public async index(@request() req: AuthenticatedRequest, @response() res: Response)
    {
        const user = req.user;

        const userBanks = await this.userBankService.getUserBanks(user);
        const response: IResponse = {
            message: 'Retrieved list of user banks',
            statusCode: 200,
            data: UserBankResource.collection(userBanks)
        };
        return res.status(response.statusCode).json(response);
    }

    @httpPost('/', TYPES.AuthenticationMiddleware)
    public async store(@request() req: AuthenticatedRequest, @response() res: Response)
    {
        const user = req.user;

        // Check if the bank exist
        const bank = await this.bankService.getBankById(req.body.bankId);

        if(bank == null)
        {
            throw new HttpException('Bank does not exist', 404);
        }

        await this.userBankService.createUserBank(req.body, user, bank);

        const response: IResponse = {
            message: 'Bank details has been added successfully',
            statusCode: 201
        }

        return res.status(response.statusCode).json(response);
    }

    @httpPut('/:id')
    public async update(@request() req: Request, @response() res: Response)
    {

    }

    @httpDelete('/:id')
    public async destory(@request() req: Request, @response() res: Response)
    {
        const userBank = await this.userBankService.getUserBankById(req.params.id);

        if(userBank == null)
        {
            throw new HttpException('Bank details does not exist', 404);
        }

        await this.userBankService.deleteUserBank(userBank);

        const response: IResponse = {
            message: 'Bank details has been deleted successfully',
            statusCode: 201
        }

        return res.status(response.statusCode).json(response);
    }
}
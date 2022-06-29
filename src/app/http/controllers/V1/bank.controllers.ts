import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut, request, response } from "inversify-express-utils";
import { TYPES } from "../../../constants";
import { BankService } from "../../../services/bank.service";
import { HttpException } from "../../exceptions";
import { IResponse } from "../../resources";
import { BankResource } from "../../resources/bank.resource";

@controller('/api/v1/general-settings/banks')
export class BankController
{
    private bankService: BankService;

    /**
     *
     */
    constructor(@inject(TYPES.BankService) bankService: BankService) {
        this.bankService = bankService;
    }
    @httpGet('/')
    public async index(@request() req: Request, @response() res: Response)
    {
        const banks = await this.bankService.getAllBanks();
        return BankResource.collection(banks);
    }

    @httpPost('/')
    public async store(@request() req: Request, @response() res: Response)
    {
        await this.bankService.createNewBank(req.body);

        const response: IResponse = {
            statusCode: 201,
            message: 'Bank was added successfully'
        };

        return res.status(response.statusCode).json(response);
    }
    
    @httpPut('/:id')
    public async update(@request() req: Request, @response() res: Response)
    {
        const bank = await this.bankService.getBankById(req.params.id);
        if(bank == null)
        
        {
            throw new HttpException('Bank does not exist', 404);
        }

        bank.name = req.body.name;
        
        this.bankService.updateBank(bank);

        const response: IResponse = {
            statusCode: 200,
            message: 'Bank was updated successfully'
        };

        return res.status(response.statusCode).json(response);
    }

    @httpDelete('/:id')
    public async delete(@request() req: Request, @response() res: Response)
    {
        const bank = await this.bankService.getBankById(req.params.id);
        if(bank == null)
        
        {
            throw new HttpException('Bank does not exist', 404);
        }

        this.bankService.deleteBank(bank);

        const response: IResponse = {
            statusCode: 200,
            message: 'Bank was deleted successfully'
        };

        return res.status(response.statusCode).json(response);
    }
}
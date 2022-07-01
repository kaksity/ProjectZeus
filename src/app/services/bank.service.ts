import { injectable } from "inversify";
import { BankEntity } from "../database/entity";

@injectable()
export class BankService
{

    public async createNewBank({ name }): Promise<void>
    {
        await BankEntity.insert({
            name
        });
    }

    public async getAllBanks(): Promise<BankEntity[]>
    {
        const banks = await BankEntity.find();
        return banks;
    }

    public async getBankById(id: string): Promise<BankEntity>
    {
        const bank = await BankEntity.findOne({
            where:{
                id
            }
        })
        return bank;
    }
    public async updateBank(bank: BankEntity): Promise<void>
    {
        await bank.save();
    }
    public async deleteBank(bank: BankEntity): Promise<void>
    {
        await bank.softRemove();
    }
}
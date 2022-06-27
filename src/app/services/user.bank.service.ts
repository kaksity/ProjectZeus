import { injectable } from "inversify";
import { UserBankEntity } from "../database/entity/user.bank.entity";

@injectable()
export class UserBankService 
{
    public async createUserBank({ accountName, accountNumber })
    {

    }

    public async getUserBankById(id: string): Promise<UserBankEntity>
    {
        return await UserBankEntity.findOne({
            where:{
                id
            }
        })
    }
    public async getUserBanks()
    {

    }
    public async updateUserBank(userBank: UserBankEntity)
    {
        
    }

    public async deleteUserBank(userBank: UserBankEntity)
    {
        await userBank.softRemove();
    }
}
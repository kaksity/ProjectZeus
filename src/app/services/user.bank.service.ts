import { injectable } from "inversify";
import { BankEntity, UserEntity } from "../database/entity";
import { UserBankEntity } from "../database/entity/user.bank.entity";

@injectable()
export class UserBankService 
{
    public async createUserBank({ accountName, accountNumber }, user: UserEntity, bank: BankEntity): Promise<void>
    {
        await UserBankEntity.insert({
            accountName,
            accountNumber,
            user,
            bank
        });
    }

    public async getUserBankById(id: string): Promise<UserBankEntity | null>
    {
        return await UserBankEntity.findOne({
            where:{
                id
            }
        })
    }
    public async getUserBanks(user: UserEntity): Promise<UserBankEntity[]>
    {
        return await UserBankEntity.find({
            relations: ['bank'],
            where: {
                user
            }
        });
    }
    public async updateUserBank(userBank: UserBankEntity)
    {
        
    }

    public async deleteUserBank(userBank: UserBankEntity)
    {
        await userBank.softRemove();
    }
}
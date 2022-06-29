import { injectable } from "inversify";
import { UserEntity } from "../database/entity";
import { WalletEntity } from "../database/entity/wallet.entity";

@injectable()
export class UserWalletService
{
    public async createWallet({ name }, user: UserEntity): Promise<void>
    {
        await WalletEntity.insert({
            name,
            user
        });
    }
    public async getAllUserWallet(user: UserEntity): Promise<WalletEntity[]>
    {
        const wallets = await WalletEntity.find({
            where:{
                user
            }
        });
        return wallets;
    }
    public async getWalletById(id: string): Promise<WalletEntity>
    {
        return await WalletEntity.findOne({
            where:{
                id
            }
        });
    }

    public async deleteWallet(wallet: WalletEntity): Promise<void>
    {
        await wallet.softRemove();
    }
}
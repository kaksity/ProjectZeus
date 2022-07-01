import { injectable } from "inversify";
import { UserEntity } from "../database/entity";
import { WalletCodeEntity } from "../database/entity/wallet.code.entity";
import { WalletEntity } from "../database/entity/wallet.entity";
import { addDays }  from "date-and-time";
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
    public async createWalletCode(code: string, wallet: WalletEntity): Promise<WalletCodeEntity>
    {
        const now = new Date();

        const walletCode = await WalletCodeEntity.create({
            wallet,
            code,
            expiresAt: addDays(now, 7)
        }).save();
        
        return walletCode;
    }
    public async getWalletCodes(wallet: WalletEntity): Promise<WalletCodeEntity[]>
    {
        return await WalletCodeEntity.find({
            where: {
                wallet
            }
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
    public async getWalletCodeByCode(walletCode: string): Promise<WalletCodeEntity>
    {
        return await WalletCodeEntity.findOne({
            where:{
                code: walletCode,
                // To Narrow the Wallet Code, Add the condition to check if the wallet code has expired or not
            }
        });
    }
    public async getWalletByWalletCode(walletCode: string): Promise<WalletEntity>
    {
        const walletCodeEntity = await WalletCodeEntity.findOne({
            relations:['wallet'],
            where:{
                code: walletCode
            }
        });
        return walletCodeEntity.wallet;
    }
    public async getWalletById(id: string): Promise<WalletEntity>
    {
        return await WalletEntity.findOne({
            where:{
                id
            }
        });
    }
    public async getUserWalletById(id: string, user: UserEntity): Promise<WalletEntity>
    {
        return await WalletEntity.findOne({
            where:{
                id,
                user
            }
        });
    }
    
    public async updateWallet(wallet: WalletEntity): Promise<void>
    {
        await wallet.save();
    }

    public async deleteWallet(wallet: WalletEntity): Promise<void>
    {
        await wallet.softRemove();
    }
}
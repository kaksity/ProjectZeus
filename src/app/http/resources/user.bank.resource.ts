import { UserBankEntity } from "../../database/entity/user.bank.entity";
import { BankResource } from "./bank.resource";

interface IData{
    id: string,
    accountName: string,
    accountNumber: string,
    bank: BankResource
}

interface IUserBankResource
{
    data: IData | IData[]
}
export class UserBankResource
{
    constructor() {
        
    }

    public static collection(userBanks: UserBankEntity[])
    {
        const data = userBanks.map((userBank) => {
            
            const data: IData = {
                id: userBank.id,
                accountName: userBank.accountName,
                accountNumber: userBank.accountNumber,
                bank: BankResource.single(userBank.bank)
            }
            return data
        });
        
        const resources: IUserBankResource = {
            data
        }

        return resources;
    }
}
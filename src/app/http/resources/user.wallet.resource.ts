import { WalletEntity } from "../../database/entity";

interface IWalletResource
{
    data: IData | IData[]
}
interface IData {
    id: string,
    name: string
}
export class UserWalletResource
{
    public static collection(wallets: WalletEntity[])
    {
        const data = wallets.map((wallet) => {
            const data: IData = {
                id: wallet.id,
                name: wallet.name
            }
            return data
        });
        const resource: IWalletResource = {
            data
        }
        return resource;
    }
}
import { WalletCodeEntity } from "../../database/entity/wallet.code.entity";

interface IData {
    id: string,
    code: string,
    expiresAt: Date
}

interface IWalletCodeResource {
    data: IData | IData[]
}
export class WalletCodeResource
{

    public static single(walletCode: WalletCodeEntity)
    {
        const data: IData =  {
            id: walletCode.id,
            code: walletCode.code,
            expiresAt: walletCode.expiresAt
        }
        const resource: IWalletCodeResource = {
            data
        }
        return resource;
    }

    public static collection(walletCodes: WalletCodeEntity[])
    {
        const data = walletCodes.map((walletCode) => {
            const data: IData =  {
                id: walletCode.id,
                code: walletCode.code,
                expiresAt: walletCode.expiresAt
            }
            return data;
        });

        const resource: IWalletCodeResource = {
            data
        }
        return resource;
    }
}
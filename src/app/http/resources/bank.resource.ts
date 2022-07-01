import { BankEntity } from "../../database/entity";

interface IBankResource {
    data: IData | IData[]
}

interface IData {
    id: string,
    name: string
}

export class BankResource
{

    public static single(bank: BankEntity)
    {
        
        const data: IData = {
            id: bank.id,
            name: bank.name
        };

        const resource: IBankResource = {
            data
        }
        return resource;
    }
    public static collection(banks: BankEntity[])
    {
        const data = banks.map(bank => {
            const data: IData =  {
                id: bank.id,
                name: bank.name
            };
            return data;
        })
        
        const resource: IBankResource = {
            data
        }
        return resource;
    }
}
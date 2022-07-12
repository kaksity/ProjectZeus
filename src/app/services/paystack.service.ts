import { injectable } from "inversify";
import { resolve } from "url";
import httpClient from "./axios.service";

@injectable()
export class PaystackService
{
    public async initializePayment({ email, amount })
    {
        try
        {
            const { data } = await httpClient.post('/transaction/initialize', {
                email,
                amount
            });
            return data;
        }
        catch(error)
        {
            
            throw error;
        }
    }

    public async verifyPayment(referenceCode: string)
    {
        try
        {
            const { data } = await httpClient.get(`/transaction/verify/${referenceCode}`)
            return data;
        }
        catch(error)
        {
            return this.handleError(error);
        }
        
    }
    private handleError(error)
    {
        if(error.status == 500)
        {
            throw new Error();
        }
        return error.response.data;
    }
}

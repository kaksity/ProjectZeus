import { injectable } from "inversify";
import { getManager } from "typeorm";
import { WalletEntity } from "../database/entity";
import { TransferEntity } from "../database/entity/transfer.entity";

@injectable()
export class TransferService
{
    public async transfer(senderWallet: WalletEntity, receiverWallet: WalletEntity, amount: any): Promise<void>
    {

        senderWallet.balance = parseFloat(senderWallet.balance as any) - parseFloat(amount);;
        receiverWallet.balance = parseFloat(receiverWallet.balance as any) + parseFloat(amount);

        const transfer = new TransferEntity();
        transfer.amount = amount;
        transfer.senderWallet = senderWallet;
        transfer.receiverWallet = receiverWallet;
        
        await getManager().transaction(async transactionalEntityManager => {
            await transactionalEntityManager.save(senderWallet);
            await transactionalEntityManager.save(receiverWallet);
            await transactionalEntityManager.save(transfer);    
        });    
    }
}
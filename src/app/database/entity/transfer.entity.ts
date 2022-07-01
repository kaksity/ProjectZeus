import { Column, Entity, ManyToOne } from "typeorm";
import { GenericEntity } from "./generic.entity";
import { WalletEntity } from "./wallet.entity";

@Entity('transfers')
export class TransferEntity extends GenericEntity
{

    @ManyToOne(() => WalletEntity, (senderWallet) => senderWallet.sentTransfers)
    senderWallet: WalletEntity;
    
    @ManyToOne(() => WalletEntity, (receiverWallet) => receiverWallet.receivedTransfers)
    receiverWallet: WalletEntity;

    @Column({ type: 'numeric', nullable: false})
    amount: number;
}
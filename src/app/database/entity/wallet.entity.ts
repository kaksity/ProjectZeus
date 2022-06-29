import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { GenericEntity } from "./generic.entity";
import { TransferEntity } from "./transfer.entity";
import { UserEntity } from "./user.entity";

@Entity('wallets')
export class WalletEntity extends GenericEntity
{
    @ManyToOne(() => UserEntity, (user) => user.wallets)
    user: UserEntity;

    @Column()
    name: string;

    @Column({ type: 'numeric', default: 0.0 })
    balance: number;

    @OneToMany(() => TransferEntity, (transfers) => transfers.senderWallet)
    sentTransfers?: TransferEntity[];

    @OneToMany(() => TransferEntity, (transfers) => transfers.receiverWallet)
    receivedTransfers?: TransferEntity[];
}
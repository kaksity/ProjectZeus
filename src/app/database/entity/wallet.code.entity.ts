import { Column, Entity, ManyToOne } from "typeorm";
import { GenericEntity } from "./generic.entity";
import { WalletEntity } from "./wallet.entity";

@Entity('wallet_codes')
export class WalletCodeEntity extends GenericEntity
{

    @ManyToOne(() => WalletEntity, (wallet) => wallet.walletCodes)
    wallet: WalletEntity;

    @Column()
    code: string;

    @Column({ type: 'date' })
    expiresAt: Date;

}
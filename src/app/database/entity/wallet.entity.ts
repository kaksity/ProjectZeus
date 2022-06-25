import { Column, Entity, ManyToOne } from "typeorm";
import { GenericEntity } from "./generic.entity";
import { UserEntity } from "./user.entity";

@Entity('wallets')
export class WalletEntity extends GenericEntity
{
    @ManyToOne(() => UserEntity, (user) => user.wallets)
    user: UserEntity;

    @Column()
    name: string;
}
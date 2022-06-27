import { Column, Entity, OneToMany } from "typeorm";
import { GenericEntity } from "./generic.entity";
import { UserBankEntity } from "./user.bank.entity";

@Entity('banks')
export class BankEntity extends GenericEntity
{
    @Column()
    name: string;

    @OneToMany(() => UserBankEntity, (userBank) => userBank.bank)
    userBanks: UserBankEntity[]
}
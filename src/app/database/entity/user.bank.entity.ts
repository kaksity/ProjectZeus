import { Column, Entity, ManyToOne } from "typeorm";
import { BankEntity } from "./bank.entity";
import { GenericEntity } from "./generic.entity";

@Entity('user_banks')
export class UserBankEntity extends GenericEntity
{
    @Column()
    accountNumber: string;
    
    @Column()
    accountName: string;
    
    @ManyToOne(() => BankEntity, (bank) => bank.userBanks)
    bank:BankEntity;
}
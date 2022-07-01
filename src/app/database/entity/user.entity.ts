import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { GenericEntity } from "./generic.entity";
import { UserBankEntity } from "./user.bank.entity";
import { WalletEntity } from "./wallet.entity";

@Entity('users')
export class UserEntity extends GenericEntity{

    @Column()
    emailAddress: string;

    @Column()
    phoneNumber: string;

    @Column()
    firstName: string;
    
    @Column({ nullable: true })
    middleName?: string;

    @Column()
    lastName: string;
    
    @Column()
    password: string;

    @OneToMany(() => WalletEntity, (wallet) => wallet.user)
    wallets?: WalletEntity[];

    @OneToMany(() => UserBankEntity, (userBank) => userBank.user)
    userBanks?: UserBankEntity[]
}

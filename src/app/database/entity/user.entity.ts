import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { GenericEntity } from "./generic.entity";

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

}

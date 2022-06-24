import { inject, injectable } from "inversify";
import { TYPES } from "../constants";
import { UserEntity } from "../database/entity";
import { UtilityService } from "./utility.service";

@injectable()
export class AuthenticationService
{
    private utilityService: UtilityService;

    /**
     *
     */
    constructor(@inject(TYPES.UtilityService) utilityService: UtilityService,) {
        this.utilityService = utilityService;
    }
    
    public async getUserByEmailAddress(emailAddress:string): Promise<UserEntity | null>
    {
        const user = await UserEntity.findOne({
            where:{
                emailAddress
            }
        });
        return user;
    }
    public async getUserByPhoneNumber(phoneNumber:string): Promise<UserEntity | null>
    {
        const user = await UserEntity.findOne({
            where:{
                phoneNumber
            }
        });
        return user;
    }

    public async createNewUser({ emailAddress, phoneNumber, firstName, lastName, password }): Promise<void>
    {
        password = await this.utilityService.hashPassword(password);

        await UserEntity.insert({
            emailAddress,
            phoneNumber,
            firstName,
            lastName,
            password
        })
    }
}
import { inject } from "inversify";
import { Request, Response } from "express";
import { controller, httpGet, httpPost, request, response } from "inversify-express-utils";
import { HttpException } from "../../exceptions";
import { TYPES } from "../../../constants";
import { UserService, UtilityService } from "../../../services";
import { UserEntity } from "../../../database/entity";
import { IResponse } from '../../resources';
@controller('/api/v1/auth')
export class AuthenticationController{

    private userService: UserService;
    private utilityService: UtilityService;

    constructor(
        @inject(TYPES.UtilityService) utilityService: UtilityService,
        @inject(TYPES.UserService) userService: UserService
    ) {
        this.userService = userService;
        this.utilityService = utilityService;
    }

    @httpPost('/login')
    public async login(@request() req: Request, @response() res: Response)
    {
        let user: UserEntity = null;

        if(req.body.emailAddress)
        {
            // Check if the email was used to login the user
            user = await this.userService.getUserByEmailAddress(req.body.emailAddress);
            if(user == null)
            {
                throw new HttpException('Invalid log in credentials', 400);
            }
        }
        else if(req.body.phoneNumber)
        {
            // Check if the phone number was used to login the user
            user = await this.userService.getUserByPhoneNumber(req.body.phoneNumber);
            if(user == null)
            {
                throw new HttpException('Invalid log in credentials', 400);
            }
        }

        

        //Compare if the password matches or not
        if(await this.utilityService.comparePassword(user.password, req.body.password) == false)
        {
            throw new HttpException('Invalid log in credentials', 400);
        }

        
        const response: IResponse = {
            statusCode: 200,
            message: 'User Logged in successfully',
            data: {
                tokenType: 'Bearer',
                token: this.utilityService.generateJWTToken({
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName
                }),
                expiresIn: 60 * 60
            }
        };

        return res.status(response.statusCode).json(response);

        
    }
    @httpPost('/register')
    public async regiser(@request() req: Request, @response() res: Response)
    {
        let user: UserEntity = null;
        // Check if the email has already been registered
        
        user = await this.userService.getUserByEmailAddress(req.body.emailAddress);
        if(user != null)
        {
            throw new HttpException('This email address has already been taken', 400);
        }
        
        // Check if the phone number has already been registered
        user = await this.userService.getUserByPhoneNumber(req.body.phoneNumber);
        if(user != null)
        {
            throw new HttpException('This phone number has already been taken', 400);
        }

        await this.userService.createNewUser(req.body);

        const response: IResponse = {
            statusCode: 201,
            message: 'User was created successfully'
        };

        return res.status(response.statusCode).json(response);
    }
}
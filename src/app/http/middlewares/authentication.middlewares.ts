import { Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { BaseMiddleware, TYPE } from "inversify-express-utils";
import { TYPES } from "../../constants";
import { UserService, UtilityService } from "../../services";
import { HttpException } from "../exceptions";
import { AuthenticatedRequest } from "../requests/authentication";

@injectable()
export class AuthenticationMiddleware extends BaseMiddleware
{
    private utilityService: UtilityService;
    private userService: UserService;
    /**
     *
     */
    constructor(
        @inject(TYPES.UtilityService) utilityService: UtilityService,
        @inject(TYPES.UserService) userService: UserService
    ) {
        super();
        this.utilityService = utilityService;
        this.userService = userService;
    }
    async handler(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        const token = req.headers.authorization;
        if(token == null)
        {
            throw new HttpException('Authorization token is required', 401);
        }

        try
        {
            const decodedToken = this.utilityService.decodeJWTToken(token.split(' ')[1]) as any;
            
            // Get the User Credentials and then attach it to the subsequent request
            const user = await this.userService.getUserById(decodedToken.id);
            
            req.user = user;

            next();
        }
        catch(error)
        {
            console.log(error)
            throw new HttpException('Authorization is invalid', 401);
        }
    }

}
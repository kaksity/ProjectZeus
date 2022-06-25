import { Request } from "express";
import { UserEntity } from "../../../database/entity";

export interface AuthenticatedRequest extends Request
{
    user: UserEntity
}
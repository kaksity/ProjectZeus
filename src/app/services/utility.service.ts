import { hash, compare } from "bcryptjs";
import { injectable } from "inversify";
import { sign, verify } from "jsonwebtoken";

@injectable()
export class UtilityService
{
    public async hashPassword(password: string): Promise<string>
    {
        const hashedPassword = await hash(password, 10);
        return hashedPassword;
    }

    public async comparePassword(hashedPassword: string, password: string): Promise<boolean>
    {
        return await compare(password, hashedPassword);
    }

    public generateJWTToken(user): string
    {
        return sign(user,process.env.JWT_TOKEN_SECRET, {
            expiresIn: '1H',
        });
    }
    public decodeJWTToken(token: string)
    {
        return verify(token, process.env.JWT_TOKEN_SECRET);
    }

    public generateRandomString(length: number = 8)
    {
        let string = 'qwertyuioplkjhgfdsazxcvbnm1234567890QWERTYUIOPLKJHGFDSASZXCVBNM';
        let result = '';
        
        for(let i = 0; i < length; i++)
        {
           result += string.charAt(Math.floor(Math.random() * string.length))
        }

        return result;
    }
}
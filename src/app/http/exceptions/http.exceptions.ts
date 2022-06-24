export class HttpException extends Error
{
    public message: string;
    public code: number;
    /**
     *
     */
    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.message = message;
        this.code = statusCode;
        Object.setPrototypeOf(this, HttpException.prototype);
    }
}
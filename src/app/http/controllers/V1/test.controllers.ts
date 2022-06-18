import { controller, httpGet } from 'inversify-express-utils';
@controller('/api/v1/test')
export class TestController
{
    @httpGet('/')
    public getTest()
    {
        return "This is a test";
    }
}
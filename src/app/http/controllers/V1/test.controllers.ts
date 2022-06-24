import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { TYPES } from '../../../constants';
import { UtilityService } from '../../../services';
import { HttpException } from '../../exceptions';
@controller('/api/v1/test')
export class TestController
{
    private utilityService: UtilityService;
    constructor(@inject(TYPES.UtilityService) utilityService: UtilityService) {
        this.utilityService = utilityService;
    }
    
    @httpGet('/')
    public async getTest()
    {
        
    }
}
import { ImpersonateService } from './impersonate.service';
export declare class ImpersonateController {
    private readonly impersonateService;
    constructor(impersonateService: ImpersonateService);
    impersonateUser(req: any, body: {
        targetUserId: string;
    }): Promise<any>;
    stopImpersonation(req: any): Promise<any>;
}

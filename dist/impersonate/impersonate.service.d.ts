import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
export declare class ImpersonateService {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    impersonateUser(moderatorId: string, targetUserId: string): Promise<any>;
    stopImpersonation(moderatorId: string): Promise<any>;
}

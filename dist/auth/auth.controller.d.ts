import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            username: string;
            email: string;
            role: import("../core/enums/role.enum").Role;
            theme: string;
        };
    }>;
    refresh(req: any): Promise<{
        access_token: string;
    }>;
}

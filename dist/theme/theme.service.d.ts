import { UsersService } from '../users/users.service';
export declare class ThemeService {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUserTheme(userId: string): Promise<string>;
    updateUserTheme(userId: string, theme: string): Promise<any>;
    getAvailableThemes(): string[];
}

import { ThemeService } from './theme.service';
export declare class ThemeController {
    private readonly themeService;
    constructor(themeService: ThemeService);
    getUserTheme(req: any): Promise<string>;
    updateUserTheme(req: any, body: {
        theme: string;
    }): Promise<any>;
    getAvailableThemes(): string[];
}

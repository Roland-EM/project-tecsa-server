import { Strategy } from 'passport-jwt';
import { ConfigService } from '@core/config.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: any): Promise<{
        userId: any;
        username: any;
        role: any;
        id: any;
    }>;
}
export {};

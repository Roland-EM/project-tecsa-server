import { ConfigService as NestConfigService } from '@nestjs/config';
export declare class ConfigService {
    private readonly configService;
    constructor(configService: NestConfigService);
    get mongoUri(): string;
    get jwtSecret(): string;
    get jwtExpiresIn(): string;
    get port(): number;
}

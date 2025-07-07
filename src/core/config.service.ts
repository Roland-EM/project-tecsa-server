import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  get mongoUri(): string {
    return this.configService.get<string>('MONGO_URI', 'mongodb+srv://admin:1234@cluster0.sf0fds9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET', 'your-super-secret-jwt-key');
  }

  get jwtExpiresIn(): string {
    return this.configService.get<string>('JWT_EXPIRES_IN', '1h');
  }

  get port(): number {
    return this.configService.get<number>('PORT', 3000);
  }
}
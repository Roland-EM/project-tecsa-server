import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class ThemeService {
  constructor(private readonly usersService: UsersService) {}

  async getUserTheme(userId: string): Promise<string> {
    const user = await this.usersService.findOne(userId);
    return user.theme || 'default';
  }

  async updateUserTheme(userId: string, theme: string): Promise<any> {
    return this.usersService.update(userId, { theme });
  }

  getAvailableThemes(): string[] {
    return ['default', 'dark', 'light', 'blue', 'green', 'purple'];
  }
}
import {
  Controller,
  Get,
  Patch,
  Body,
  Request,
} from '@nestjs/common';
import { ThemeService } from './theme.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('theme')
@ApiBearerAuth()
@Controller('theme')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Get()
  getUserTheme(@Request() req) {
    return this.themeService.getUserTheme(req.user.userId || req.user.id);
  }

  @Patch()
  updateUserTheme(@Request() req, @Body() body: { theme: string }) {
    return this.themeService.updateUserTheme(req.user.userId || req.user.id, body.theme);
  }

  @Get('available')
  getAvailableThemes() {
    return this.themeService.getAvailableThemes();
  }
}
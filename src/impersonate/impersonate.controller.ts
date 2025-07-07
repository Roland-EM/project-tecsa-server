import {
  Controller,
  Post,
  Body,
  Request,
} from '@nestjs/common';
import { ImpersonateService } from './impersonate.service';
import { Roles } from '@shared/decorators/roles.decorator';
import { Role } from '@core/enums/role.enum';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('impersonate')
@ApiBearerAuth()
@Controller('impersonate')
@Roles(Role.OWNER, Role.ADMIN)
export class ImpersonateController {
  constructor(private readonly impersonateService: ImpersonateService) {}

  @Post('start')
  impersonateUser(@Request() req, @Body() body: { targetUserId: string }) {
    console.log('Impersonating user, request body:', body);
    console.log('Current user:', req.user);
    return this.impersonateService.impersonateUser(req.user.userId || req.user.id, body.targetUserId);
  }

  @Post('stop')
  stopImpersonation(@Request() req) {
    console.log('Stopping impersonation, user:', req.user);
    return this.impersonateService.stopImpersonation(req.user.userId || req.user.id);
  }
}
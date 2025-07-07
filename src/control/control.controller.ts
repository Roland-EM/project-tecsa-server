import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { ControlService } from './control.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Roles } from '@shared/decorators/roles.decorator';
import { Role } from '@core/enums/role.enum';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('control')
@ApiBearerAuth()
@Controller('control')
@Roles(Role.OWNER) // Only owner can access control endpoints
export class ControlController {
  constructor(private readonly controlService: ControlService) {}

  @Post('users')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.controlService.createUser(createUserDto);
  }

  @Get('users')
  getAllUsers() {
    return this.controlService.getAllUsers();
  }

  @Patch('users/:id/reset-password')
  resetUserPassword(@Param('id') id: string, @Body() body: { password: string }) {
    return this.controlService.resetUserPassword(id, body.password);
  }

  @Patch('users/:id/role')
  changeUserRole(@Param('id') id: string, @Body() body: { role: Role }) {
    return this.controlService.changeUserRole(id, body.role);
  }

  @Patch('users/:id/deactivate')
  deactivateUser(@Param('id') id: string) {
    return this.controlService.deactivateUser(id);
  }

  @Patch('users/:id/activate')
  activateUser(@Param('id') id: string) {
    return this.controlService.activateUser(id);
  }

  @Get('audit-logs')
  getAuditLogs() {
    return this.controlService.getAuditLogs();
  }
}
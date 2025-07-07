import { Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('roles')
@ApiBearerAuth()
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  getRoles() {
    return this.rolesService.getRoles();
  }

  @Get('hierarchy')
  getRoleHierarchy() {
    return this.rolesService.getRoleHierarchy();
  }
}
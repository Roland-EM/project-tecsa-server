import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
} from '@nestjs/common';
import { ZonesService } from './zones.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { Roles } from '@shared/decorators/roles.decorator';
import { Role } from '@core/enums/role.enum';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('zones')
@ApiBearerAuth()
@Controller('zones')
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @Post()
  @Roles(Role.OWNER, Role.ADMIN)
  create(@Body() createZoneDto: CreateZoneDto, @Request() req) {
    return this.zonesService.create(createZoneDto, req.user.userId);
  }

  @Get()
  findAll(@Query('parentId') parentId?: string) {
    if (parentId) {
      return this.zonesService.findByParent(parentId);
    }
    return this.zonesService.findAll();
  }

  @Get('hierarchy')
  getHierarchy() {
    return this.zonesService.getHierarchy();
  }

  @Get('root')
  getRootZones() {
    return this.zonesService.getRootZones();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zonesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.OWNER, Role.ADMIN)
  update(@Param('id') id: string, @Body() updateZoneDto: Partial<CreateZoneDto>) {
    return this.zonesService.update(id, updateZoneDto);
  }

  @Delete(':id')
  @Roles(Role.OWNER, Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.zonesService.remove(id);
  }
}
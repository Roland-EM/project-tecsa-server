import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardTemplateDto } from './dto/create-card-template.dto';
import { Roles } from '@shared/decorators/roles.decorator';
import { Role } from '@core/enums/role.enum';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('cards')
@ApiBearerAuth()
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get('templates')
  findAll(@Query('category') category?: string, @Query('role') role?: Role) {
    if (category) {
      return this.cardsService.findByCategory(category);
    }
    if (role) {
      return this.cardsService.findByRole(role);
    }
    return this.cardsService.findAll();
  }

  @Post('templates')
  @Roles(Role.OWNER, Role.ADMIN)
  create(@Body() createCardTemplateDto: CreateCardTemplateDto) {
    return this.cardsService.create(createCardTemplateDto);
  }
}
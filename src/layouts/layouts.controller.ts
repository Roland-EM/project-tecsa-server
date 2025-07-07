import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
  Request,
} from '@nestjs/common';
import { LayoutsService } from './layouts.service';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { AddCardInstanceDto } from './dto/add-card-instance.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('layouts')
@ApiBearerAuth()
@Controller('layouts')
export class LayoutsController {
  constructor(private readonly layoutsService: LayoutsService) {}

  @Get()
  findUserLayouts(
    @Request() req,
    @Query('page') page?: string,
    @Query('zoneId') zoneId?: string,
  ) {
    return this.layoutsService.findUserLayouts(req.user.userId || req.user.id, page, zoneId);
  }

  @Post()
  createLayout(@Body() createLayoutDto: CreateLayoutDto) {
    return this.layoutsService.createLayout(createLayoutDto);
  }

  @Post('cards')
  addCardInstance(
    @Request() req,
    @Query('page') page: string,
    @Query('zoneId') zoneId: string,
    @Body() addCardInstanceDto: AddCardInstanceDto,
  ) {
    return this.layoutsService.addCardInstance(
      req.user.userId || req.user.id,
      page,
      zoneId,
      addCardInstanceDto,
    );
  }

  @Delete(':page/cards/:cardInstanceId')
  removeCardInstance(
    @Request() req,
    @Param('page') page: string,
    @Param('cardInstanceId') cardInstanceId: string,
    @Query('zoneId') zoneId?: string,
  ) {
    return this.layoutsService.removeCardInstance(
      req.user.userId || req.user.id,
      page,
      cardInstanceId,
      zoneId,
    );
  }

  @Patch(':page/cards/:cardInstanceId')
  updateCardInstance(
    @Request() req,
    @Param('page') page: string,
    @Param('cardInstanceId') cardInstanceId: string,
    @Body() updateData: any,
    @Query('zoneId') zoneId?: string,
  ) {
    return this.layoutsService.updateCardInstance(
      req.user.userId || req.user.id,
      page,
      cardInstanceId,
      updateData,
      zoneId,
    );
  }

  @Delete(':page')
  deleteLayout(
    @Request() req,
    @Param('page') page: string,
    @Query('zoneId') zoneId?: string,
  ) {
    return this.layoutsService.deleteLayout(req.user.userId || req.user.id, page, zoneId);
  }
}
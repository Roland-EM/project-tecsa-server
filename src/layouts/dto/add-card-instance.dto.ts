import { IsString, IsNumber, IsObject, IsOptional } from 'class-validator';

export class AddCardInstanceDto {
  @IsString()
  cardTemplateId: string;

  @IsString()
  @IsOptional()
  deviceId?: string;

  @IsNumber()
  posX: number;

  @IsNumber()
  posY: number;

  @IsNumber()
  sizeX: number;

  @IsNumber()
  sizeY: number;

  @IsObject()
  @IsOptional()
  settings?: any;
}
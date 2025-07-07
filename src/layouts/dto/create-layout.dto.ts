import { IsString, IsOptional, IsArray } from 'class-validator';
import { CardInstance } from '../schemas/layout.schema';

export class CreateLayoutDto {
  @IsString()
  userId: string;

  @IsString()
  page: string;

  @IsString()
  @IsOptional()
  zoneId?: string;

  @IsArray()
  @IsOptional()
  cardInstances?: CardInstance[];
}
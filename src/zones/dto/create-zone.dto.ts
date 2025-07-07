import { IsString, IsEnum, IsOptional, IsArray } from 'class-validator';

export class CreateZoneDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  parentId?: string;

  @IsEnum(['zone', 'group'])
  type: 'zone' | 'group';

  @IsArray()
  @IsOptional()
  children?: string[];

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
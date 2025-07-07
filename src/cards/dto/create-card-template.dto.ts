import { IsString, IsEnum, IsObject, IsArray, IsOptional } from 'class-validator';
import { Role } from '@core/enums/role.enum';

export class CreateCardTemplateDto {
  @IsString()
  templateId: string;

  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsEnum(Role)
  @IsOptional()
  minRole?: Role;

  @IsObject()
  size: { x: number; y: number };

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsObject()
  @IsOptional()
  defaultSettings?: any;

  @IsArray()
  @IsOptional()
  supportedDeviceTypes?: string[];
}
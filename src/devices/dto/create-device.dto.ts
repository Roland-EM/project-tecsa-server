import { IsString, IsObject, IsOptional, IsBoolean } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  protocol: string;

  @IsString()
  @IsOptional()
  zoneId?: string;

  @IsObject()
  @IsOptional()
  data?: any;

  @IsBoolean()
  @IsOptional()
  online?: boolean;

  @IsObject()
  @IsOptional()
  config?: any;
}
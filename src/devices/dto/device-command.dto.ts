import { IsString, IsObject } from 'class-validator';

export class DeviceCommandDto {
  @IsString()
  action: string;

  @IsObject()
  params: any;
}
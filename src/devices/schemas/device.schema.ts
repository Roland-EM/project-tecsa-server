import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DeviceDocument = HydratedDocument<Device>;

@Schema({ timestamps: true })
export class Device {
  @Prop({ unique: true, required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string; // 'light-bulb', 'power-meter', 'sensor', etc.

  @Prop({ required: true })
  protocol: string; // 'KNX', 'WiFi', 'Zigbee', etc.

  @Prop()
  zoneId?: string;

  @Prop({ type: Object, default: {} })
  data: any; // Device-specific data: status, brightness, temperature, etc.

  @Prop({ default: false })
  online: boolean;

  @Prop({ type: Object, default: {} })
  config: any; // Protocol-specific configuration

  @Prop()
  createdBy: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
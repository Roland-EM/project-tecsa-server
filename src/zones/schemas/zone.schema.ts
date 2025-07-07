import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ZoneDocument = HydratedDocument<Zone>;

@Schema({ timestamps: true })
export class Zone {
  @Prop({ unique: true, required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  parentId?: string;

  @Prop({ enum: ['zone', 'group'], required: true })
  type: 'zone' | 'group';

  @Prop({ type: [String], default: [] })
  children: string[];

  @Prop()
  thumbnail?: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  createdBy: string;
}

export const ZoneSchema = SchemaFactory.createForClass(Zone);
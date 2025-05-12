import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Traffic extends Document {
  @Prop()
  date: Date;

  @Prop()
  plate: string;

  @Prop()
  direction: number;
  @Prop()
  deviceID: string;
}
export const TrafficSchema = SchemaFactory.createForClass(Traffic);

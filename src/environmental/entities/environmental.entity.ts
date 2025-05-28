import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Environmental extends Document {
  @Prop({})
  date: string;

  @Prop()
  temperature: number;

  @Prop()
  pressure: number;

  @Prop()
  humidity: number;

  @Prop()
  deviceID: string;
}

export const EnviromentalSchema = SchemaFactory.createForClass(Environmental);

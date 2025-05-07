import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Environmental extends Document {
  //No puede haber dos iguales
  @Prop({
    unique: true,
    index: true,
  })
  'date': string;

  @Prop()
  'temperature': number;

  @Prop()
  'pressure': number;

  @Prop()
  'humidity': number;
}

export const EnviromentalSchema = SchemaFactory.createForClass(Environmental);

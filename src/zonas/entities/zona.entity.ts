import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Zona {
  @Prop()
  description: string;

  @Prop()
  devices: string[];
}
export const ZonaSchema = SchemaFactory.createForClass(Zona);

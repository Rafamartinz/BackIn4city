import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema()
export class Device {
  @Prop()
  lat: Number;

  @Prop()
  lgn: Number;

  @Prop()
  fabricante: string;

  @Prop()
  type: string;

  @Prop()
  description: string;

  @Prop({ type: Number })
  createdAt: number;
  @Prop()
  guid: string;

  @Prop()
  zoneId: string;
}

export const DevicesSchema = SchemaFactory.createForClass(Device);

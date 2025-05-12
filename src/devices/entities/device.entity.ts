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

  @Prop({ default: Date.now })
  CreatedAt: Date;

  @Prop()
  guid: string;
}

export const DevicesSchema = SchemaFactory.createForClass(Device);

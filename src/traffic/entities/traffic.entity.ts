import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class Traffic {
  @Prop({
    unique: true,
    index: true,
  })
  'date': string;

  @Prop()
  'plate': string;

  @Prop()
  'direction': number;
}
export const TrafficSchema = SchemaFactory.createForClass(Traffic);

import { Module } from '@nestjs/common';
import { TrafficService } from './traffic.service';
import { TrafficController } from './traffic.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Traffic, TrafficSchema } from './entities/traffic.entity';
import { Mongoose } from 'mongoose';

@Module({
  controllers: [TrafficController],
  providers: [TrafficService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Traffic.name,
        schema: TrafficSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class TrafficModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrafficService } from './traffic.service';
import { TrafficController } from './traffic.controller';
import { Traffic, TrafficSchema } from './entities/traffic.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Traffic.name, schema: TrafficSchema }]),
  ],
  controllers: [TrafficController],
  providers: [TrafficService],
  exports: [MongooseModule],
})
export class TrafficModule {}

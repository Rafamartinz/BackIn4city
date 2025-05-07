import { Module } from '@nestjs/common';
import { TrafficService } from './traffic.service';
import { TrafficController } from './traffic.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Traffic, TrafficSchema } from './entities/traffic.entity';

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
})
export class TrafficModule {}

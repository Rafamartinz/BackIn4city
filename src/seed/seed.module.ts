import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import {
  EnviromentalSchema,
  Environmental,
} from 'src/environmental/entities/environmental.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentalModule } from 'src/environmental/environmental.module';
import { TrafficModule } from 'src/traffic/traffic.module';
import { TrafficController } from 'src/traffic/traffic.controller';
import { Traffic, TrafficSchema } from 'src/traffic/entities/traffic.entity';
import { EnvironmentalService } from 'src/environmental/environmental.service';
import { traceDeprecation } from 'node:process';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [TrafficModule, EnvironmentalModule],
})
export class SeedModule {}

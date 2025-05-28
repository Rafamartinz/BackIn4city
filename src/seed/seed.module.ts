import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { EnvironmentalModule } from 'src/environmental/environmental.module';
import { TrafficModule } from 'src/traffic/traffic.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [TrafficModule, EnvironmentalModule],
})
export class SeedModule {}

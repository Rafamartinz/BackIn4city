import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Device, DevicesSchema } from './entities/device.entity';
import { EnvironmentalModule } from '../environmental/environmental.module';
import { TrafficModule } from 'src/traffic/traffic.module';

@Module({
  controllers: [DevicesController],
  providers: [DevicesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Device.name,
        schema: DevicesSchema,
      },
    ]),

    EnvironmentalModule,
    TrafficModule,
  ],

  exports: [MongooseModule],
})
export class DevicesModule {}

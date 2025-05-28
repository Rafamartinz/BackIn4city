import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Traffic } from './entities/traffic.entity';

@Injectable()
export class TrafficService {
  constructor(
    @InjectModel(Traffic.name) private readonly trafficModel: Model<Traffic>,
  ) {}

  findAll() {
    return this.trafficModel.find();
  }

  //BUsca por deviceId la info del device

  findInfoFromDeviceID(deviceID: string) {
    if (!deviceID) {
      console.error('No hay Info sobre ese id');
    }
    const deviceInfo = this.trafficModel.findOne({ deviceID: deviceID });

    return deviceInfo;
  }
}

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Environmental } from './entities/environmental.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EnvironmentalService {
  constructor(
    @InjectModel(Environmental.name)
    private readonly EnvironmentalModel: Model<Environmental>,
  ) {}

  findAll() {
    return this.EnvironmentalModel.find();
  }

  //Busca el device con ese DeviceID
  findInfoFromDeviceID(deviceID: string) {
    if (!deviceID) {
      console.error('No hay Info sobre ese id');
    }
    const deviceInfo = this.EnvironmentalModel.findOne({ deviceID: deviceID });

    return deviceInfo;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { Device } from './entities/device.entity';
import { Model } from 'mongoose';
import { error } from 'console';
import { InjectModel } from '@nestjs/mongoose';
import {
  EnviromentalSchema,
  Environmental,
} from '../environmental/entities/environmental.entity';
import { Traffic } from 'src/traffic/entities/traffic.entity';
/* var uuid = require('uuid'); */
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device.name)
    private readonly DeviceModel: Model<Device>,

    @InjectModel(Environmental.name)
    private readonly EnvironmentalModel: Model<Environmental>,

    @InjectModel(Traffic.name)
    private readonly trafficModel: Model<Traffic>,
  ) {}

  async createDevice(createDeviceDto: CreateDeviceDto) {
    try {
      createDeviceDto.guid = uuidv4();
      const NewDevice = new this.DeviceModel(createDeviceDto);
      await NewDevice.save();

      const environmental = await this.EnvironmentalModel.findOne({
        deviceID: null,
      });

      const traffic = await this.trafficModel.findOne({
        deviceID: null,
      });

      if (NewDevice.type === 'environmental') {
        if (environmental) {
          //El deviceID es lo que voy a utilizar  como id de busqueda
          environmental.deviceID = NewDevice.guid;
          console.log(environmental.deviceID);
          await environmental.save();
        }
      } else {
        if (traffic) {
          traffic.deviceID = NewDevice.guid;
          await traffic.save();
        }
      }

      return NewDevice;
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return this.DeviceModel.find();
  }
}

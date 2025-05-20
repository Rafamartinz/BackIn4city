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
      createDeviceDto.createdAt = Date.now();
      createDeviceDto.createdAt = Math.floor(Date.now() / 1000);
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

  async filterForDate(type?: string, fecIni?: number, EndDate?: number) {
    try {
      const filter: any = {};

      if (fecIni || EndDate) {
        filter.createdAt = {};
        if (fecIni) {
          filter.createdAt.$gte = Math.floor(fecIni / 1000);
        }
        if (EndDate) {
          filter.createdAt.$lte = Math.floor(EndDate / 1000);
        }
      }

      if (type) {
        filter.type = type;
      }

      const devicesInRange = await this.DeviceModel.find(filter);
      console.log('Dispositivos encontrados:', devicesInRange.length);
      return devicesInRange;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  /* 
  async deleteByID(id: string) {
    const device = await this.DeviceModel.findById(id);

    if (device?.type === 'environmental') {
      await this.EnvironmentalModel.findOneAndDelete({ deviceID: device.guid });
    }
    if (device?.type === 'traffic') {
      await this.trafficModel.findOneAndDelete({ deviceID: device.guid });
    }

    await this.DeviceModel.findByIdAndDelete(id);
  } */

  findAll() {
    return this.DeviceModel.find();
  }

  findOneById(id: string) {
    return this.DeviceModel.findById(id);
  }
}

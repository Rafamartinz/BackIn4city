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
      const environmental = await this.EnvironmentalModel.findOne({
        deviceID: null,
      });
      const traffic = await this.trafficModel.findOne({ deviceID: null });

      if (createDeviceDto.type === 'environmental' && !environmental) {
        throw new Error('No hay datos para el dispositivo ambiental');
      }

      if (createDeviceDto.type !== 'environmental' && !traffic) {
        throw new Error('No hay datos para el dispositivo de trafico');
      }

      createDeviceDto.guid = uuidv4();
      createDeviceDto.createdAt = Math.floor(Date.now() / 1000);

      const NewDevice = new this.DeviceModel(createDeviceDto);
      await NewDevice.save();

      if (NewDevice.type === 'environmental') {
        if (environmental) {
          environmental.deviceID = NewDevice.guid;
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
      console.error(error);
      throw error;
    }
  }

  async filterForDate(
    type?: string,
    fecIni?: number,
    EndDate?: number,
    page: number = 1,
    limit: number = 10,
  ) {
    try {
      const filter: any = {};

      if (fecIni || EndDate) {
        filter.createdAt = {};
        if (fecIni) {
          const fecIniTimestamp = Math.floor(new Date(fecIni).getTime() / 1000);
          filter.createdAt.$gte = fecIniTimestamp;
        }
        if (EndDate) {
          const fecFinTimestamp = Math.floor(
            new Date(EndDate).getTime() / 1000,
          );
          filter.createdAt.$lte = fecFinTimestamp;
        }
      }

      if (type) {
        filter.type = type;
      }

      const skip = (page - 1) * limit;

      const [devices, total] = await Promise.all([
        this.DeviceModel.find(filter)
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 }),
        this.DeviceModel.countDocuments(filter),
      ]);

      return {
        data: devices,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
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

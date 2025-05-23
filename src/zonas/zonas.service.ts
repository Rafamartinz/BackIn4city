import { Injectable } from '@nestjs/common';
import { CreateZonaDto } from './dto/create-zona.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Zona } from './entities/zona.entity';
import { Model } from 'mongoose';
import { Device } from 'src/devices/entities/device.entity';
import { CreateDeviceDto } from '../devices/dto/create-device.dto';

@Injectable()
export class ZonasService {
  constructor(
    @InjectModel(Zona.name)
    private readonly zonaModel: Model<Zona>,

    @InjectModel(Device.name)
    private readonly deviceModel: Model<Device>,
  ) {}

  async create(createZonaDto: CreateZonaDto) {
    const newZona = new this.zonaModel({
      description: createZonaDto.description,
      devices: createZonaDto.devices,
    });
    console.log(newZona);

    const saveZona = await newZona.save();

    const deviceIds = createZonaDto.devices;

    for (const deviceId of deviceIds) {
      await this.deviceModel.findByIdAndUpdate(deviceId, {
        zoneId: saveZona._id,
      });
    }

    return saveZona;
  }

  findAll() {
    return this.zonaModel.find();
  }

  findOne(id: string) {
    return this.zonaModel.findById(id);
  }
}

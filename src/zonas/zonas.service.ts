import { Injectable, NotFoundException } from '@nestjs/common';
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
    //For que va id a id buscando el respectivo disposivito y settea zoneiD con el id
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

  async PatchZoneDevices(zoneId: string, deviceId: string) {
    const zone = await this.zonaModel.findById(zoneId);
    if (!zone) throw new NotFoundException('Zona no encontrada');

    //Si en el array de id de devices no esta el id que paso por parametro pe lo pushea
    if (!zone.devices.includes(deviceId)) {
      zone.devices.push(deviceId);
      await zone.save();
    }

    const device = await this.deviceModel.findById(deviceId);
    if (!device) throw new NotFoundException('Dispositivo no encontrado');
    //Setteo el campo zoneID de el device con ese ID
    device.zoneId = zoneId;
    await device.save();
  }
}

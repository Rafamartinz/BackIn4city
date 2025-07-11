import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { Device } from './entities/device.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Environmental } from '../environmental/entities/environmental.entity';
import { Traffic } from 'src/traffic/entities/traffic.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Zona } from '../zonas/entities/zona.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device.name)
    private readonly DeviceModel: Model<Device>,

    @InjectModel(Zona.name)
    private readonly ZonaModel: Model<Zona>,

    @InjectModel(Environmental.name)
    private readonly EnvironmentalModel: Model<Environmental>,

    @InjectModel(Traffic.name)
    private readonly trafficModel: Model<Traffic>,
  ) {}

  //Creacion de dispositivos
  async createDevice(createDeviceDto: CreateDeviceDto) {
    try {
      //Intenta buscar datos de medioambiente o trafico sin asignar(Sin guid)
      const environmental = await this.EnvironmentalModel.findOne({
        deviceID: null,
      });
      const traffic = await this.trafficModel.findOne({ deviceID: null });

      //Si no lo encuentra lanza una exception para mostrar en front
      if (createDeviceDto.type === 'environmental' && !environmental) {
        throw new HttpException(
          'No hay datos para el dispositivo ambiental',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (createDeviceDto.type !== 'environmental' && !traffic) {
        throw new HttpException(
          'No hay datos para el dispositivo de tráfico',
          HttpStatus.BAD_REQUEST,
        );
      }

      //Si pasa todas las validaciones asignados a el dispositivo en guid y ponemos la fecha correcta ya que la creo con timestapm porch
      createDeviceDto.guid = uuidv4();
      createDeviceDto.createdAt = Math.floor(Date.now() / 1000);

      const NewDevice = new this.DeviceModel(createDeviceDto);
      await NewDevice.save();

      //Y añadimos ese guid a deviceID de el dato que sea trafico o medioambiente
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

  //Filtrar para mostrar los dispositivos y paginacion

  async filterForDate(
    type?: string,
    fecIni?: number,
    EndDate?: number,
    page: number = 1,
    limit: number = 10,
  ) {
    try {
      const filter: any = {};
      //Si hay datos de fecIni y Enddate las pasamos los timestamp a fecha
      if (fecIni || EndDate) {
        filter.createdAt = {};
        if (fecIni) {
          const fecIniTimestamp = Math.floor(new Date(fecIni).getTime() / 1000);
          console.log('Fecha pasada a timestamp service', fecIniTimestamp);

          filter.createdAt.$gte = fecIniTimestamp;
        }
        if (EndDate) {
          const fecFinTimestamp = Math.floor(
            new Date(EndDate).getTime() / 1000,
          );
          console.log('Fecha pasada a timestamp service', fecFinTimestamp);
          filter.createdAt.$lte = fecFinTimestamp;
        }
      }

      //Simplemente el tipo es lo que pongas de valor si tiene
      if (type) {
        filter.type = type;
      }

      //Formula para saber la cantidad de el salto de dispositivos
      const skip = (page - 1) * limit;

      //Ejecuto dos consultas a la vez
      // Una es que me busque esos dispositivos con esos filtros
      const [devices, total] = await Promise.all([
        this.DeviceModel.find(filter)
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 }),
        //CountDocuments los cuenta,sirve para saber las paginas que hay de dispositivos
        this.DeviceModel.countDocuments(filter),
      ]);

      //Devuelve los valores
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

  /* Por si fuese necesario
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

  async ModifyDevices(deviceId: string, deviceModify: UpdateDeviceDto) {
    const device = await this.DeviceModel.findById(deviceId);
    if (!device) throw new NotFoundException('Dispositivo no encontrado');

    const ModifyZoneId = deviceModify.zoneId?.toString().trim();

    // Si no se especifica una zona, conservar la actual
    if (!ModifyZoneId) {
      deviceModify.zoneId = deviceModify.zoneId;

      //Misma logica que abajo
      const zonaAntiguo = await this.ZonaModel.findById(device.zoneId);
      if (zonaAntiguo) {
        zonaAntiguo.devices = zonaAntiguo.devices.filter(
          (id) => id.toString() !== deviceId,
        );
        await zonaAntiguo.save();
      }
    } else if (device.zoneId?.toString() !== ModifyZoneId) {
      // Zona antigua: bprrar deviceId del array
      if (!device.zoneId) {
        console.log('No hay id de zona previo');
      } else {
        const zonaAntiguo = await this.ZonaModel.findById(device.zoneId);
        if (zonaAntiguo) {
          zonaAntiguo.devices = zonaAntiguo.devices.filter(
            (id) => id.toString() !== deviceId,
          );
          await zonaAntiguo.save();
        }
      }
      // Zona nueva: agregar deviceId si no esta

      const zonaNueva = await this.ZonaModel.findById(ModifyZoneId);
      if (zonaNueva) {
        if (!zonaNueva.devices.some((id) => id.toString() === deviceId)) {
          zonaNueva.devices.push(deviceId);
          await zonaNueva.save();
        }
      }

      deviceModify.zoneId = ModifyZoneId;
    } else {
      deviceModify.zoneId = device.zoneId;
    }

    // Conservar datos originales
    deviceModify.guid = device.guid;
    deviceModify.createdAt = device.createdAt;

    // Actualizar el dispositivo
    device.set(deviceModify);
    await device.save();

    return device;
  }
}

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEnvironmentalDto } from './dto/create-environmental.dto';
import { isValidObjectId, Model } from 'mongoose';
import {
  Environmental,
  EnviromentalSchema,
} from './entities/environmental.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Device } from '../devices/entities/device.entity';
import { createTracing } from 'trace_events';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class EnvironmentalService {
  constructor(
    @InjectModel(Environmental.name)
    private readonly EnvironmentalModel: Model<Environmental>,
    @InjectModel(Environmental.name)
    private readonly devicesModel: Model<Device>,
  ) {}

  findAll() {
    return this.EnvironmentalModel.find();
  }
  /* 
  findInfoFromDeviceID(deviceID: number) {
    const device = this.EnvironmentalModel.findById(deviceID);

    return device;
  }
 */
}

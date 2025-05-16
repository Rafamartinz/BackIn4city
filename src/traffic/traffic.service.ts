import { Injectable } from '@nestjs/common';
import { CreateTrafficDto } from './dto/create-traffic.dto';
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
}

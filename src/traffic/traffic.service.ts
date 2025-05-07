import { Injectable } from '@nestjs/common';
import { CreateTrafficDto } from './dto/create-traffic.dto';

@Injectable()
export class TrafficService {
  create(createTrafficDto: CreateTrafficDto) {
    return 'This action adds a new traffic';
  }

  findAll() {
    return `This action returns all traffic`;
  }
}

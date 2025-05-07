import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrafficService } from './traffic.service';
import { CreateTrafficDto } from './dto/create-traffic.dto';

@Controller('traffic')
export class TrafficController {
  constructor(private readonly trafficService: TrafficService) {}

  @Post()
  create(@Body() createTrafficDto: CreateTrafficDto) {
    return this.trafficService.create(createTrafficDto);
  }

  @Get()
  findAll() {
    return this.trafficService.findAll();
  }
}

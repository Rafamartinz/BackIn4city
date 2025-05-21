import { Controller, Get, Query, Param } from '@nestjs/common';
import { EnvironmentalService } from './environmental.service';
import { Console } from 'console';

@Controller('environmental')
export class EnvironmentalController {
  constructor(private readonly environmentalService: EnvironmentalService) {}

  @Get()
  findAll() {
    return this.environmentalService.findAll();
  }

  @Get('/:deviceID')
  findByDeviceID(@Param('deviceID') deviceID: string) {
    return this.environmentalService.findInfoFromDeviceID(deviceID);
  }
}

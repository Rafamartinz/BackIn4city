import { Controller, Get, Post, Body, Param, Patch, Put } from '@nestjs/common';
import { EnvironmentalService } from './environmental.service';
import { CreateEnvironmentalDto } from './dto/create-environmental.dto';
import { DevicesService } from '../devices/devices.service';
import { CreateDeviceDto } from '../devices/dto/create-device.dto';
import { get } from 'mongoose';

@Controller('environmental')
export class EnvironmentalController {
  constructor(private readonly environmentalService: EnvironmentalService) {}

  /*   @Post()
  create(@Body() createEnvironmentalDto: CreateEnvironmentalDto) {
    return this.environmentalService.create(createEnvironmentalDto);
  } */

  @Get()
  findAll() {
    return this.environmentalService.findAll();
  }

  @Get()
  findByDeviceID(deviceID: number) {
    return this.environmentalService.findInfoFromDeviceID(deviceID);
  }
}

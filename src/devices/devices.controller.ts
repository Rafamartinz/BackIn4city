import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.createDevice(createDeviceDto);
  }
  @Get('filter')
  async getFilterData(
    @Query('fecIni') fecIni: string,
    @Query('endDate') endDate: string,
  ) {
    let fecIniD = new Date(fecIni);
    let endDateD = new Date(endDate);

    let fecIniTimestamp = fecIniD.getTime();
    let endDateTimestamp = endDateD.getTime();

    console.log(fecIniTimestamp);

    return this.devicesService.filterForDate(fecIniTimestamp, endDateTimestamp);
  }
}

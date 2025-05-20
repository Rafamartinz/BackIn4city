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

  @Get()
  findAll() {
    return this.devicesService.findAll();
  }

  @Get('filter')
  async getFilterData(
    @Query('fecIni') fecIni: string,
    @Query('endDate') endDate: string,
    @Query('type') type: string,
  ) {
    let fecIniD = new Date(fecIni);
    let endDateD = new Date(endDate);

    let fecIniTimestamp = fecIniD.getTime();
    let endDateTimestamp = endDateD.getTime();

    console.log(fecIniTimestamp);

    return this.devicesService.filterForDate(
      type,
      fecIniTimestamp,
      endDateTimestamp,
    );
  }

  @Get('/:id')
  findOneById(@Param('id') id: string) {
    return this.devicesService.findOneById(id);
  }

  /* @Delete('delete')
  async deleteDeviceAndInfo(@Query('id') id: string) {
    return await this.devicesService.deleteByID(id);
  } */
}

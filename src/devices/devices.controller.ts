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
  async getDevicesWithFilter(
    @Query('type') type?: string,
    @Query('fecIni') fecIni?: number,
    @Query('EndDate') EndDate?: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.devicesService.filterForDate(
      type,
      fecIni,
      EndDate,
      page,
      limit,
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

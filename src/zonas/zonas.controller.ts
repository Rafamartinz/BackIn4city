import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { ZonasService } from './zonas.service';
import { CreateZonaDto } from './dto/create-zona.dto';
import { get } from 'mongoose';
import { ReturningStatementNotSupportedError } from 'typeorm';

@Controller('zones')
export class ZonasController {
  constructor(private readonly zonasService: ZonasService) {}

  @Post()
  create(@Body() createZonaDto: CreateZonaDto) {
    return this.zonasService.create(createZonaDto);
  }

  @Get()
  findAll() {
    return this.zonasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zonasService.findOne(id);
  }

  @Patch('addDeviceId/:id')
  async addDeviceToZone(
    @Param('id') zoneId: string,
    @Body('deviceId') deviceId: string,
  ) {
    return this.zonasService.PatchZoneDevices(zoneId, deviceId);
  }
}

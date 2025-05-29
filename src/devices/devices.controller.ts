import { Controller, Get, Post, Body, Param, Query, Put } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';

import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateDeviceDto } from './dto/update-device.dto';

@ApiTags('Dispositivos')
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo dispositivo' })
  @ApiResponse({ status: 201, description: 'Dispositivo creado exitosamente' })
  @ApiBody({ type: CreateDeviceDto })
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.createDevice(createDeviceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los dispositivos' })
  @ApiResponse({ status: 200, description: 'Lista de dispositivos' })
  findAll() {
    return this.devicesService.findAll();
  }

  //Llamo a la funcion del servicio inicializando algunas variables
  @Get('filter')
  @ApiOperation({ summary: 'Obtener los dispositivos con filtros' })
  @ApiQuery({
    name: 'type',
    required: false,
    description: 'Tipo del dispositivo(Traffic/environmental)',
  })
  @ApiQuery({
    name: 'fecIni',
    required: false,
    description: 'Fecha de inicio del rango (formato: YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    description: 'Fecha final del rango (formato: YYYY-MM-DD) ',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número de pagina para paginacion (por defecto: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Cantidad de elementos por pagina (por defecto: 10)',
  })
  @ApiResponse({ status: 200, description: 'Dispositivos encontrados' })
  @ApiResponse({ status: 404, description: 'Dispositivos no encontrados' })
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
  @ApiOperation({ summary: 'Obtener un dispositivo por ID' })
  @ApiParam({ name: 'id', description: 'ID de el dispositivo' })
  @ApiResponse({ status: 200, description: 'Dispositivo encontrado' })
  @ApiResponse({ status: 404, description: 'Dispositivo no encontrado' })
  findOneById(@Param('id') id: string) {
    return this.devicesService.findOneById(id);
  }

  /* @Delete('delete')
  async deleteDeviceAndInfo(@Query('id') id: string) {
    return await this.devicesService.deleteByID(id);
  } */

  @Put('modifyDevice/:deviceId')
  @ApiOperation({ summary: 'Modificar un dispositivo' })
  @ApiParam({ name: 'deviceId', description: 'ID del dispositivo' })
  @ApiBody({ type: UpdateDeviceDto })
  @ApiResponse({
    status: 200,
    description: 'Dispositivo modificado exitosamente',
  })
  async modifyDevice(
    @Param('deviceId') deviceId: string,
    @Body() modifyDevice: UpdateDeviceDto,
  ) {
    return this.devicesService.ModifyDevices(deviceId, modifyDevice);
  }
}

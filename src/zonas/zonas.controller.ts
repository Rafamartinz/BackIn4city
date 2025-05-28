import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ZonasService } from './zonas.service';
import { CreateZonaDto } from './dto/create-zona.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Zonas')
@Controller('zones')
export class ZonasController {
  constructor(private readonly zonasService: ZonasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva zona' })
  @ApiResponse({ status: 201, description: 'Zona creada exitosamente' })
  @ApiBody({ type: CreateZonaDto })
  create(@Body() createZonaDto: CreateZonaDto) {
    return this.zonasService.create(createZonaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las zonas' })
  @ApiResponse({ status: 200, description: 'Lista de zonas' })
  findAll() {
    return this.zonasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una zona por ID' })
  @ApiParam({ name: 'id', description: 'ID de la zona' })
  @ApiResponse({ status: 200, description: 'Zona encontrada' })
  @ApiResponse({ status: 404, description: 'Zona no encontrada' })
  findOne(@Param('id') id: string) {
    return this.zonasService.findOne(id);
  }

  @Patch('addDeviceId/:id')
  @ApiOperation({ summary: 'Agregar un dispositivo a una zona' })
  @ApiParam({ name: 'id', description: 'ID de la zona' })
  @ApiBody({ schema: { properties: { deviceId: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Dispositivo agregado a la zona' })
  async addDeviceToZone(
    @Param('id') zoneId: string,
    @Body('deviceId') deviceId: string,
  ) {
    return this.zonasService.PatchZoneDevices(zoneId, deviceId);
  }
}

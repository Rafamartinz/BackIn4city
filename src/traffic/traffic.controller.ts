import { Controller, Get, Param } from '@nestjs/common';
import { TrafficService } from './traffic.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Trafico')
@Controller('traffic')
export class TrafficController {
  constructor(private readonly trafficService: TrafficService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todo la informacion de trafico' })
  @ApiResponse({ status: 200, description: 'Datos encontrados' })
  @ApiResponse({ status: 404, description: 'Dispositivos no encontrados' })
  findAll() {
    return this.trafficService.findAll();
  }

  @Get('/:deviceID')
  @ApiOperation({ summary: 'Obtener informacion de un dispositivo por ID' })
  @ApiParam({ name: 'id', description: 'ID de el dispositivo' })
  @ApiResponse({ status: 200, description: 'Dispositivo encontrado' })
  @ApiResponse({ status: 404, description: 'Dispositivo no encontrado' })
  findByDeviceID(@Param('deviceID') deviceID: string) {
    return this.trafficService.findInfoFromDeviceID(deviceID);
  }
}

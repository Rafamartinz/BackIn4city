import { Controller, Get, Param } from '@nestjs/common';
import { EnvironmentalService } from './environmental.service';
import { ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Medio ambiente')
@Controller('environmental')
export class EnvironmentalController {
  constructor(private readonly environmentalService: EnvironmentalService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todo la informacion de medio ambiente' })
  @ApiResponse({ status: 200, description: 'Datos encontrados' })
  @ApiResponse({ status: 404, description: 'Dispositivos no encontrados' })
  findAll() {
    return this.environmentalService.findAll();
  }

  @Get('/:deviceID')
  @ApiOperation({ summary: 'Obtener informacion de un dispositivo por ID' })
  @ApiParam({ name: 'id', description: 'ID de el dispositivo' })
  @ApiResponse({ status: 200, description: 'Dispositivo encontrado' })
  @ApiResponse({ status: 404, description: 'Dispositivo no encontrado' })
  findByDeviceID(@Param('deviceID') deviceID: string) {
    return this.environmentalService.findInfoFromDeviceID(deviceID);
  }
}

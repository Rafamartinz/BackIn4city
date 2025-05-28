import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
//  CONTROLADOR POR SI SE NECESITA MAS DATOS DE MEDIOAMBIENTE Y TRAFICO
@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  @ApiOperation({ summary: 'Introducir datos de environmental/traffic' })
  @ApiResponse({ status: 201, description: 'Datos guardados correctamente' })
  async ImportDataFromJSON() {
    await this.seedService.ImportDataFromJSON();
    return 'Datos guardados correctamente';
  }
}

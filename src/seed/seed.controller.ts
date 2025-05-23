import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SeedService } from './seed.service';
//  CONTROLADOR POR SI SE NECESITA MAS DATOS DE MEDIOAMBIENTE Y TRAFICO
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  async ImportDataFromJSON() {
    await this.seedService.ImportDataFromJSON();

    return 'Datos guardados correctamente';
  }
}

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ZonasService } from './zonas.service';
import { CreateZonaDto } from './dto/create-zona.dto';

@Controller('zonas')
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
}

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EnvironmentalService } from './environmental.service';
import { CreateEnvironmentalDto } from './dto/create-environmental.dto';

@Controller('environmental')
export class EnvironmentalController {
  constructor(private readonly environmentalService: EnvironmentalService) {}

  /*   @Post()
  create(@Body() createEnvironmentalDto: CreateEnvironmentalDto) {
    return this.environmentalService.create(createEnvironmentalDto);
  } */

  @Get()
  findAll() {
    return this.environmentalService.findAll();
  }
}

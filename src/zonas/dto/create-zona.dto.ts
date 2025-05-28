import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateZonaDto {
  @ApiProperty({
    example: 'Zona sur Jaen',
    description: 'Descripcion breve de la zona',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: ['682c6c0cdf7ceed4ca504cd4', '682c6c0cdf7ceed4ca504cd5'],
    description: 'Arrays de IDs de dispositivos',
  })
  @IsArray()
  @IsString({ each: true })
  devices: string[];
}

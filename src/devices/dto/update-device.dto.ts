import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDeviceDto {
  @ApiProperty({
    example: '-3.234',
    description: 'Latitud del dispositivo',
  })
  @IsNumber()
  lat: Number;

  @ApiProperty({
    example: '34.234',
    description: 'Longitud del dispositivo',
  })
  @IsNumber()
  lgn: Number;

  @ApiProperty({
    example: 'Rafa',
    description: 'El creador del dispositivo',
  })
  @IsString()
  fabricante: string;

  @ApiProperty({
    example: 'traffic',
    description: 'Es el tipo del dispositivo[Traffic/Environmental]',
  })
  @IsString()
  @IsIn(['environmental', 'traffic'])
  type: string;

  @ApiProperty({
    example: 'Camara de trafico en zona escolar ',
    description: 'Informacion acerca de el dispositivo',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: '1747742100',
    description:
      'Fecha del dispositivo en formato timestamp (milisegundos desde Epoch)',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  createdAt?: number; // timestamp

  @ApiProperty({
    example: 'e21f865c-49a0-4a09-8fa6-56ba77914996',
    description:
      'Identificador externo del dispositivo (GUID de tráfico o medioambiente)',
    format: 'uuid',
    required: false,
  })
  @IsString()
  guid?: string;

  @ApiProperty({
    example: '682c6bc1df7ceed4ca504c20',
    description:
      'Mongo ObjectId que referencia la zona a la que pertenece el dispositivo',
    required: false,
  })
  @IsString()
  zoneId?: string;
}

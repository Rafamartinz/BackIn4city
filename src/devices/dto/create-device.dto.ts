import { IsIn, IsNumber, IsString } from 'class-validator';
export class CreateDeviceDto {
  @IsNumber()
  lat: Number;

  @IsNumber()
  lgn: Number;

  @IsString()
  fabricante: string;

  @IsString()
  @IsIn(['environmental', 'traffic'])
  type: string;

  @IsString()
  description: string;

  @IsString()
  guid?: string;
}

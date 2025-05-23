import { IsDate, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Timestamp } from 'rxjs';
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

  @IsOptional()
  @IsNumber()
  createdAt?: number; // timestamp

  @IsString()
  guid?: string;

  @IsString()
  zoneId?: string;
}

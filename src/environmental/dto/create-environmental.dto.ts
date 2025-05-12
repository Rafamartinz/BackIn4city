import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEnvironmentalDto {
  @IsString()
  'date': string;

  @IsNumber()
  'temperature': number;

  @IsNumber()
  'pressure': number;

  @IsNumber()
  'humidity': number;

  @IsNumber()
  'deviceID': string;
}

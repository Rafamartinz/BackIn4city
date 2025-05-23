import { IsArray, IsString, ArrayNotEmpty, ArrayUnique } from 'class-validator';

export class CreateZonaDto {
  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  devices: string[];
}

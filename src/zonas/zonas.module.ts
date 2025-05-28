import { forwardRef, Module } from '@nestjs/common';
import { ZonasService } from './zonas.service';
import { ZonasController } from './zonas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Zona, ZonaSchema } from './entities/zona.entity';
import { DevicesModule } from 'src/devices/devices.module';

@Module({
  controllers: [ZonasController],
  providers: [ZonasService],

  imports: [
    MongooseModule.forFeature([{ name: Zona.name, schema: ZonaSchema }]),
    forwardRef(() => DevicesModule),
  ],

  exports: [MongooseModule],
})
export class ZonasModule {}

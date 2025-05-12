import { Module } from '@nestjs/common';
import { EnvironmentalService } from './environmental.service';
import { EnvironmentalController } from './environmental.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Environmental,
  EnviromentalSchema,
} from './entities/environmental.entity';

@Module({
  controllers: [EnvironmentalController],
  providers: [EnvironmentalService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Environmental.name,
        schema: EnviromentalSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class EnvironmentalModule {}

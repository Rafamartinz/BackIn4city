import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import {
  EnviromentalSchema,
  Environmental,
} from 'src/environmental/entities/environmental.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    MongooseModule.forFeature([
      { name: Environmental.name, schema: EnviromentalSchema },
    ]),
  ],
})
export class SeedModule {}

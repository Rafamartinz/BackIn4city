import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEnvironmentalDto } from './dto/create-environmental.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Environmental } from './entities/environmental.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EnvironmentalService {
  constructor(
    @InjectModel(Environmental.name)
    private readonly EnvironmentalModel: Model<Environmental>,
  ) {}

  /*   async create(createEnvironmentalDto: CreateEnvironmentalDto) {
    try {
      const environmental = await this.EnvironmentalModel.create(
        createEnvironmentalDto,
      );

      return environmental;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Environmental data with duplicate value exists: ${JSON.stringify(error.keyValue)}`,
        );
      }
      console.log(error);
      throw new InternalServerErrorException();
    }
  } */

  findAll() {
    return this.EnvironmentalModel.find();
  }

  async findOne(term: string) {
    let environmental: Environmental | null = null;

    if (isValidObjectId(term)) {
      environmental = await this.EnvironmentalModel.findById(term);
    }

    if (!environmental) {
      environmental = await this.EnvironmentalModel.findOne({ date: term });
    }

    if (!environmental) {
      throw new NotFoundException(`Environmental data not found for: ${term}`);
    }

    return environmental;
  }
}

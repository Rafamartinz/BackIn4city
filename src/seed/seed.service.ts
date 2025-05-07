import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Environmental } from 'src/environmental/entities/environmental.entity';
import * as fs from 'fs';
import { Traffic } from 'src/traffic/entities/traffic.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Environmental.name)
    private readonly EnviromentalModel: Model<Environmental>,
    private readonly TrafficModel: Model<Traffic>,
  ) {}

  async ImportDataFromJSON() {
    try {
      const rawDataEnvironment = fs.readFileSync(
        './data/dataEnvi.json',
        'utf8',
      );
      const dataEnvi = JSON.parse(rawDataEnvironment);
      await this.EnviromentalModel.insertMany(dataEnvi);

      //Data traffic
      const rawDataTraffic = fs.readFileSync(
        '.../data/dataTraffic.json',
        'utf8',
      );

      const dataTraffic = JSON.parse(rawDataTraffic);
      await this.TrafficModel.insertMany(dataTraffic);

      console.log('Datos importados');
    } catch (error) {
      console.log(error);
      console.error('No se pudo importar');
    }
  }
}

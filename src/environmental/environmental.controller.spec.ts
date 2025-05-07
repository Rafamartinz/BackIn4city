import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentalController } from './environmental.controller';
import { EnvironmentalService } from './environmental.service';

describe('EnvironmentalController', () => {
  let controller: EnvironmentalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnvironmentalController],
      providers: [EnvironmentalService],
    }).compile();

    controller = module.get<EnvironmentalController>(EnvironmentalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

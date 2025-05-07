import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentalService } from './environmental.service';

describe('EnvironmentalService', () => {
  let service: EnvironmentalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnvironmentalService],
    }).compile();

    service = module.get<EnvironmentalService>(EnvironmentalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

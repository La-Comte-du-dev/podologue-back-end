import { Test, TestingModule } from '@nestjs/testing';
import { CaresService } from './cares.service';

describe('CaresService', () => {
  let service: CaresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaresService],
    }).compile();

    service = module.get<CaresService>(CaresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

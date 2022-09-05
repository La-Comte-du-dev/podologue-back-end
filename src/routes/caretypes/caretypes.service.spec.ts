import { Test, TestingModule } from '@nestjs/testing';
import { CaretypesService } from './caretypes.service';

describe('CaretypesService', () => {
  let service: CaretypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaretypesService],
    }).compile();

    service = module.get<CaretypesService>(CaretypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

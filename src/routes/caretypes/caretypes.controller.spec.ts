import { Test, TestingModule } from '@nestjs/testing';
import { CaretypesController } from './caretypes.controller';

describe('CaretypesController', () => {
  let controller: CaretypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaretypesController],
    }).compile();

    controller = module.get<CaretypesController>(CaretypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

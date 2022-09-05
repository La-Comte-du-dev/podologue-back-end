import { Test, TestingModule } from '@nestjs/testing';
import { CaresController } from './cares.controller';

describe('CaresController', () => {
  let controller: CaresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaresController],
    }).compile();

    controller = module.get<CaresController>(CaresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Module } from '@nestjs/common';
import { CaretypesController } from './caretypes.controller';
import { CaretypesService } from './caretypes.service';

@Module({
  controllers: [CaretypesController],
  providers: [CaretypesService]
})
export class CaretypesModule {}

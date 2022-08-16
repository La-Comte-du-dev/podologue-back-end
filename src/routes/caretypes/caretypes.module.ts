import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LogModule } from '../log/log.module';
import { CaretypesController } from './caretypes.controller';
import { CaretypesService } from './caretypes.service';

@Module({
  imports: [LogModule],
  controllers: [CaretypesController],
  providers: [CaretypesService, PrismaService],
})
export class CaretypesModule {}

import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LogModule } from '../log/log.module';
import { CaresController } from './cares.controller';
import { CaresService } from './cares.service';

@Module({
  imports: [LogModule],
  controllers: [CaresController],
  providers: [CaresService, PrismaService],
})
export class CaresModule {}

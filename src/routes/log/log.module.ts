import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LogController } from './log.controller';
import { LogService } from './log.service';

@Module({
  controllers: [LogController],
  providers: [LogService, PrismaService],
})
export class LogModule {}

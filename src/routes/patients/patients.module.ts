import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LogModule } from '../log/log.module';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

@Module({
  imports: [LogModule],
  controllers: [PatientsController],
  providers: [PatientsService, PrismaService],
})
export class PatientsModule {}

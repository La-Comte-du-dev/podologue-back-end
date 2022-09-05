import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LogModule } from '../log/log.module';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';

@Module({
  imports: [LogModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, PrismaService],
})
export class AppointmentsModule {}

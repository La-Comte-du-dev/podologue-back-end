import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { LogModule } from './routes/log/log.module';
import { PatientsModule } from './routes/patients/patients.module';
import { CaretypesModule } from './routes/caretypes/caretypes.module';
import { CaresModule } from './routes/cares/cares.module';
import { AppointmentsModule } from './Routes/appointments/appointments.module';

@Module({
  imports: [
    LogModule,
    PatientsModule,
    CaretypesModule,
    CaresModule,
    AppointmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

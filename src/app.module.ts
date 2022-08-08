import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { PatientsModule } from './routes/patients/patients.module';

@Module({
  imports: [PatientsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

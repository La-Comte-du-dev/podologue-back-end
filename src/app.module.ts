import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { LogModule } from './routes/log/log.module';
import { PatientsModule } from './routes/patients/patients.module';

@Module({
  imports: [LogModule, PatientsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

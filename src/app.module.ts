import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { LogModule } from './routes/log/log.module';

@Module({
  imports: [LogModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

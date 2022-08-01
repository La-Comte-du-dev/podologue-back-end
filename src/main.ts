import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Podologue')
    .setDescription('The podologue API description')
    .setVersion('1.0')
    .addTag('pdlg')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  await app.listen(8080);
}
bootstrap();

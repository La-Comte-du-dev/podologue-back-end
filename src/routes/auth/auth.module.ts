import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/routes/auth/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './Strategy/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: config.secretKey,
      signOptions: { expiresIn: 60 * 60 * 24 + 's' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UsersService, JwtStrategy],
})
export class AuthModule {}

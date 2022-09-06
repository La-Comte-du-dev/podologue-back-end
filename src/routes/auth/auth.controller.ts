import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { JoiValidationPipe } from 'src/pipe/joi/joi-validation.pipe';
import { AuthService } from './auth.service';
import { signinSchema } from '../../Schemas/joi-auth-schema';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SigninDto } from './users/users.dto';

@ApiTags('api/auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    type: SigninDto,
    description: 'signin',
  })
  @Post('signin')
  @UsePipes(new JoiValidationPipe(signinSchema))
  async signin(@Body() userData: Prisma.UserCreateInput): Promise<{
    access_token: string;
  }> {
    const { ...data } = userData;
    return this.authService.signin({
      ...data,
    });
  }
}

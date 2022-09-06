import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  UsePipes,
} from '@nestjs/common';
import { ParamToNumberPipe } from 'src/pipe/convert/param-to-number.pipe';
import { Prisma, User as UserModel } from '@prisma/client';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('api/users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':param')
  async getUser(
    @Param('param') param: Prisma.UserWhereUniqueInput,
  ): Promise<UserModel> {
    const user = await this.userService.getUser(param);
    if (!user) {
      throw new NotFoundException('No user found');
    }
    return user;
  }

  @Get()
  async getUsers(): Promise<UserModel[]> {
    const users = await this.userService.getUsers();
    if (users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  @Delete(':id')
  @UsePipes(ParamToNumberPipe)
  async deleteUser(@Param('id') id: number): Promise<UserModel> {
    const user = await this.userService.getUser(id);
    if (!user) {
      throw new NotFoundException('No user can be delated');
    }
    return this.userService.deleteUser(id);
  }
}

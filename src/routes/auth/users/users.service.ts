import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //Get all users
  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  //Get user by ID or email
  async getUser(param: any): Promise<User | null> {
    if (parseInt(param) == param) {
      const id = parseInt(param);
      return this.prisma.user.findUnique({ where: { id: id } });
    } else {
      if (param.match(/^\S{1,}@\S{2,}\.\S{2,}$/)) {
        return this.prisma.user.findUnique({ where: { email: param } });
      }
      return this.prisma.user.findUnique({ where: { username: param } });
    }
  }

  // create a new user
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  // update a user
  async updateuser(id: number, data: User): Promise<User> {
    return this.prisma.user.update({
      where: { id: id },
      data: data,
    });
  }

  //delete a user
  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id: id },
    });
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UsersService } from 'src/routes/auth/users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { defaultAdmin } from './auth-config';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async signup({
    username,
    password,
    email,
    role,
  }: Prisma.UserCreateInput): Promise<User> {
    // see if username exist
    const existingUserName = await this.usersService.getUser(username);
    const existingUserMail = await this.usersService.getUser(email);

    if (existingUserName) {
      throw new BadRequestException('username already exist');
    }
    if (existingUserMail) {
      throw new BadRequestException('email already exist');
    }
    // Hash the password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');
    //Hash the salt and password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // Join hashed password and salt
    const result = salt + '.' + hash.toString('hex');

    const newUser = { username, password: result, email, role };
    const user = await this.usersService.createUser(newUser);
    return user;
  }

  async signin(data: Prisma.UserCreateInput): Promise<{
    access_token: string;
  }> {
    const username = data.username;
    const clearPassword = data.password;
    const user = await this.usersService.getUser(username);
    const existingAdmin = await this.usersService.getUsers();
    if (existingAdmin.length === 0) {
      await this.signup(defaultAdmin);
      this.signin(defaultAdmin);
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const [salt, storedhash] = user.password.split('.');
    const hash = (await scrypt(clearPassword, salt, 32)) as Buffer;

    if (storedhash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }
    const { password, ...userObject } = user;
    const payload = {
      createdAt: new Date().toISOString(),
      sub: userObject.id,
      username: userObject.username,
      email: userObject.email,
      role: userObject.role,
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  async updateUser(id: number, userData: User): Promise<User> {
    // see if username exist

    const userByName = await this.usersService.getUser(userData.username);
    const userByMail = await this.usersService.getUser(userData.email);
    const userById = await this.usersService.getUser(id);
    if (!userById) {
      throw new NotFoundException('User not found');
    }
    if (id !== userData.id) {
      throw new BadRequestException('you try to update an incorect user');
    }
    if (userData.password.length < 8 || userData.password.length > 20) {
      throw new BadRequestException('bad password');
    }
    if (id === userByName.id && id === userByMail.id) {
      // Hash the password
      // Generate a salt
      const salt = randomBytes(8).toString('hex');
      //Hash the salt and password together
      const hash = (await scrypt(userData.password, salt, 32)) as Buffer;
      // Join hashed password and salt
      const result = salt + '.' + hash.toString('hex');

      userData.password = result;

      return this.usersService.updateuser(id, userData);
    } else if (id !== userByName.id && id === userByMail.id) {
      throw new BadRequestException('username already exist');
    }
    if (id === userByName.id && id !== userByMail.id) {
      throw new BadRequestException('email already exist');
    }
  }
}

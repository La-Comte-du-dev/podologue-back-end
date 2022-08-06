import { ImATeapotException, Injectable } from '@nestjs/common';
import { CategoryEnum, Log, Prisma, SourceEnum } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class LogService {
  constructor(private _prisma: PrismaService) {}

  //Get all Log
  async getLog(): Promise<Log[]> {
    return this._prisma.log.findMany();
  }

  // add a log
  async addLog(data: Prisma.LogCreateInput): Promise<Log> {
    const source = data.source;
    const category = data.category;
    if (!(source in SourceEnum && category in CategoryEnum)) {
      throw new ImATeapotException('bad Enum');
    }
    return this._prisma.log.create({
      data,
    });
  }
}

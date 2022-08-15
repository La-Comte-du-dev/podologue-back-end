import { ImATeapotException, Injectable } from '@nestjs/common';
import { CategoryEnum, Log, Prisma, SourceEnum } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { LogDto } from './log.dto';

@Injectable()
export class LogService {
  constructor(private _prisma: PrismaService) {}

  //Get all Log
  async getLog(): Promise<Log[]> {
    return this._prisma.log.findMany();
  }

  // add a log
  public async addLog(dto: LogDto): Promise<Log> {
    const data: Prisma.LogCreateInput = {
      component: dto.component,
      message: dto.message,
      error: dto.error,
      category: dto.category,
      source: dto.source,
    };

    const source = dto.source;
    const category = dto.category;

    if (!(source in SourceEnum && category in CategoryEnum)) {
      throw new ImATeapotException('bad Enum');
    }

    return this._prisma.log.create({
      data,
    });
  }
}

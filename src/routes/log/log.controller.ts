import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Log as LogModel } from '@prisma/client';
import { LogDto } from './log.dto';
import { LogService } from './log.service';

@ApiTags('api/log')
@Controller('api/log')
export class LogController {
  constructor(private readonly _logService: LogService) {}

  @Get()
  async getLogs(): Promise<LogModel[]> {
    const logs = await this._logService.getLog();
    if (logs.length === 0) {
      throw new NotFoundException('No log yet');
    }
    return logs;
  }

  @ApiBody({
    type: LogDto,
    description: 'Store product structure',
  })
  @Post()
  async addLog(@Body() log: LogDto): Promise<LogModel> {
    const { ...data } = log;
    return this._logService.addLog({
      ...data,
    });
  }
}

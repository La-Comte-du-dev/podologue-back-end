import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Log as LogModel } from '@prisma/client';
import { JwtAuthGuard } from 'src/guards/jwtAuth.guard';
import { JoiValidationPipe } from 'src/pipe/joi/joi-validation.pipe';
import { logSchema } from 'src/schemas/joi-log-schema';
import { LogDto } from './log.dto';
import { LogService } from './log.service';

@ApiTags('api/log')
@Controller('api/log')
export class LogController {
  constructor(private readonly _logService: LogService) {}

  @UseGuards(JwtAuthGuard)
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
  public async addLog(@Body() log: LogDto): Promise<LogModel> {
    const { ...data } = log;
    return this._logService.addLog({
      ...data,
    });
  }
}

import {
  Controller,
  Get,
  Param,
  UsePipes,
  NotFoundException,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  CategoryEnum,
  Care as CareModel,
  Prisma,
  SourceEnum,
} from '@prisma/client';
import { ParamToNumberPipe } from 'src/pipe/convert/param-to-number.pipe';
import { LogService } from '../log/log.service';
import { CareDto } from './cares.dto';
import { CaresService } from './cares.service';

@ApiTags('api/cares')
@Controller('api/cares')
export class CaresController {
  constructor(
    private readonly CaresService: CaresService,
    private _logService: LogService,
  ) {}

  @ApiBody({
    type: CareDto,
    description: 'Store Cares informations',
  })
  //get all Cares
  @Get()
  async getCares(): Promise<CareModel[]> {
    try {
      return await this.CaresService.getCare();
    } catch (error) {
      this._logService.addLog({
        source: SourceEnum.BACK,
        category: CategoryEnum.ERROR,
        component: this.constructor.name,
        message: error.message,
        error: error.code,
      });
    }
  }

  //get a Care by his id
  @Get(':id')
  @UsePipes(ParamToNumberPipe)
  public async getCareById(@Param('id') id: number): Promise<CareDto> {
    try {
      const Care = await this.CaresService.getCareById({ id });
      if (!Care) {
        throw new NotFoundException('No Care found');
      }
      return Care;
    } catch (error) {
      this._logService.addLog({
        source: SourceEnum.BACK,
        category: CategoryEnum.ERROR,
        component: this.constructor.name,
        message: error.message,
        error: error.code,
      });
    }
  }

  //post a Care
  @Post()
  async createCare(@Body() CareData: CareDto): Promise<CareModel> {
    const { ...data } = CareData;
    try {
      return this.CaresService.createCare({ ...data });
    } catch (error) {
      this._logService.addLog({
        source: SourceEnum.BACK,
        category: CategoryEnum.ERROR,
        component: this.constructor.name,
        message: error.message,
        error: error.code,
      });
    }
  }

  //update a Care
  @Put(':id')
  @UsePipes(ParamToNumberPipe)
  public async updateCare(
    @Param('id') id: number,
    @Body() CareData: Prisma.CareUpdateInput,
  ): Promise<CareModel> {
    try {
      const { ...data } = CareData;
      const Care = await this.CaresService.getCareById({ id });
      if (!Care) {
        throw new NotFoundException('No Care can be updated');
      }
      return this.CaresService.updateCare({
        careId: id,
        data: { ...data },
      });
    } catch (error) {
      this._logService.addLog({
        source: SourceEnum.BACK,
        category: CategoryEnum.ERROR,
        component: this.constructor.name,
        message: error.message,
        error: error.code,
      });
    }
  }

  //delete a Care
  @Delete(':id')
  @UsePipes(ParamToNumberPipe)
  async deleteCare(@Param('id') id: number): Promise<CareModel> {
    try {
      const Care = await this.CaresService.getCareById({ id });
      if (!Care) {
        throw new NotFoundException('No Care found, cannot delete it');
      }
      return this.CaresService.deleteCare(id);
    } catch (error) {
      this._logService.addLog({
        source: SourceEnum.BACK,
        category: CategoryEnum.ERROR,
        component: this.constructor.name,
        message: error.message,
        error: error.code,
      });
    }
  }
}

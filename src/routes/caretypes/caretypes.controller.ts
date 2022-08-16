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
  CareType as CaretypeModel,
  Prisma,
  SourceEnum,
} from '@prisma/client';
import { ParamToNumberPipe } from 'src/pipe/convert/param-to-number.pipe';
import { LogService } from '../log/log.service';
import { CaretypeDto } from './caretypes.dto';
import { CaretypesService } from './caretypes.service';

@ApiTags('api/caretypas')
@Controller('api/caretypes')
export class CaretypesController {
  constructor(
    private readonly CareTypessService: CaretypesService,
    private _logService: LogService,
  ) {}

  @ApiBody({
    type: CaretypeDto,
    description: 'Store CareTypes informations',
  })
  //get all CareTypess
  @Get()
  async getCareTypess(): Promise<CaretypeModel[]> {
    try {
      return await this.CareTypessService.getCareTypes();
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

  //get a CareTypes by his id
  @Get(':id')
  @UsePipes(ParamToNumberPipe)
  public async getCareTypesById(@Param('id') id: number): Promise<CaretypeDto> {
    try {
      const CareTypes = await this.CareTypessService.getCareTypeById({ id });
      if (!CareTypes) {
        throw new NotFoundException('No CareTypes found');
      }
      return CareTypes;
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

  //post a CareTypes
  @Post()
  async createCareTypes(
    @Body() CareTypesData: CaretypeDto,
  ): Promise<CaretypeModel> {
    const { ...data } = CareTypesData;
    try {
      return this.CareTypessService.createCareType({ ...data });
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

  //update a CareTypes
  @Put(':id')
  @UsePipes(ParamToNumberPipe)
  public async updateCareTypes(
    @Param('id') id: number,
    @Body() CareTypesData: Prisma.CareTypeUpdateInput,
  ): Promise<CaretypeModel> {
    try {
      const { ...data } = CareTypesData;
      const CareTypes = await this.CareTypessService.getCareTypeById({ id });
      if (!CareTypes) {
        throw new NotFoundException('No CareTypes can be updated');
      }
      return this.CareTypessService.updateCareType({
        caretypeId: id,
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

  //delete a CareTypes
  @Delete(':id')
  @UsePipes(ParamToNumberPipe)
  async deleteCareTypes(@Param('id') id: number): Promise<CaretypeModel> {
    try {
      const CareTypes = await this.CareTypessService.getCareTypeById({ id });
      if (!CareTypes) {
        throw new NotFoundException('No CareTypes found, cannot delete it');
      }
      return this.CareTypessService.deleteCareType(id);
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

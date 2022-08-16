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
  Patient as PatientModel,
  Prisma,
  SourceEnum,
} from '@prisma/client';
import { ParamToNumberPipe } from 'src/pipe/convert/param-to-number.pipe';
import { LogService } from '../log/log.service';
import { PatientDto } from './patients.dto';
import { PatientsService } from './patients.service';

@ApiTags('api/patients')
@Controller('api/patients')
export class PatientsController {
  constructor(
    private readonly patientsService: PatientsService,
    private _logService: LogService,
  ) {}

  @ApiBody({
    type: PatientDto,
    description: 'Store patients informations',
  })

  //get all patients
  @Get()
  async getPatients(): Promise<PatientModel[]> {
    try {
      return await this.patientsService.getPatient();
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

  //get a patient by his id
  @Get(':id')
  @UsePipes(ParamToNumberPipe)
  public async getPatientById(@Param('id') id: number): Promise<PatientDto> {
    try {
      const patient = await this.patientsService.getPatientById({ id });
      if (!patient) {
        throw new NotFoundException('No patient found');
      }
      return patient;
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

  //get patients whose data match an input
  @Get('search/:input')
  public async getPatientsByInput(
    @Param('input') input: string,
  ): Promise<PatientModel[] | null> {
    try {
      const patients = await this.patientsService.getPatientsByInput(input);
      if (!patients) {
        throw new NotFoundException('No patient matching');
      }
      return patients;
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

  //post a patient
  @Post()
  async createPatient(@Body() patientData: PatientDto): Promise<PatientModel> {
    const { ...data } = patientData;
    try {
      return this.patientsService.createPatient({ ...data });
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

  //update a patient
  @Put(':id')
  @UsePipes(ParamToNumberPipe)
  public async updatePatient(
    @Param('id') id: number,
    @Body() patientData: Prisma.PatientUpdateInput,
  ): Promise<PatientModel> {
    try {
      const { ...data } = patientData;
      const patient = await this.patientsService.getPatientById({ id });
      if (!patient) {
        throw new NotFoundException('No patient can be updated');
      }
      return this.patientsService.updatePatient({
        patientId: id,
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

  //delete a patient
  @Delete(':id')
  @UsePipes(ParamToNumberPipe)
  async deletePatient(@Param('id') id: number): Promise<PatientModel> {
    try {
      const patient = await this.patientsService.getPatientById({ id });
      if (!patient) {
        throw new NotFoundException('No patient found, cannot delete it');
      }
      return this.patientsService.deletePatient(id);
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

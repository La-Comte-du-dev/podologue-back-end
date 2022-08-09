import {
  Controller,
  Get,
  Param,
  UsePipes,
  NotFoundException,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Patient as PatientModel } from '@prisma/client';
import { ParamToNumberPipe } from 'src/pipe/convert/param-to-number.pipe';
import { PatientDto } from './Interfaces/patients.dto';
import { PatientsService } from './patients.service';
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @ApiBody({
    type: PatientDto,
    description: 'Store patients informations',
  })
  @Get()
  async getPatients(): Promise<PatientModel[]> {
    return await this.patientsService.getPatient();
  }

  @Get(':id')
  @UsePipes(ParamToNumberPipe)
  async getPatientById(@Param('id') id: number): Promise<PatientModel> {
    const patient = await this.patientsService.getPatientById({ id });
    if (!patient) {
      throw new NotFoundException('No patient found');
    }
    return patient;
  }

  @Get(':input')
  async getPatientsByInput(
    @Param('input') input: string,
  ): Promise<PatientModel[] | null> {
    const patients = await this.patientsService.getPatientsByInput(input);
    if (!patients) {
      throw new NotFoundException('No patient matching');
    }
    return patients;
  }
}

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
import { ApiBody } from '@nestjs/swagger';
import { Patient as PatientModel, Prisma } from '@prisma/client';
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

  //get all patients
  @Get()
  async getPatients(): Promise<PatientModel[]> {
    return await this.patientsService.getPatient();
  }

  //get a patient by his id
  @Get(':id')
  @UsePipes(ParamToNumberPipe)
  async getPatientById(@Param('id') id: number): Promise<PatientModel> {
    const patient = await this.patientsService.getPatientById({ id });
    if (!patient) {
      throw new NotFoundException('No patient found');
    }
    return patient;
  }

  //get patients whose data match an input
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

  //post a patient
  @Post()
  async createPatient(@Body() patientData: PatientDto): Promise<PatientModel> {
    const { ...data } = patientData;
    console.log(patientData);
    return this.patientsService.createPatient({ ...data });
  }

  //update a patient
  @Put(':id')
  @UsePipes(ParamToNumberPipe)
  async updatePatient(
    @Param('id') id: number,
    @Body() patientData: Prisma.PatientUpdateInput,
  ): Promise<PatientModel> {
    const { ...data } = patientData;
    const patient = await this.patientsService.getPatientById({ id });
    if (!patient) {
      throw new NotFoundException('No patient can be updated');
    }
    return this.patientsService.updatePatient({
      patientId: id,
      data: { ...data },
    });
  }

  //delete a patient
  @Delete(':id')
  @UsePipes(ParamToNumberPipe)
  async deletePatient(@Param('id') id: number): Promise<PatientModel> {
    const patient = await this.patientsService.getPatientById({ id });
    if (!patient) {
      throw new NotFoundException('No patient found, cannot delete it');
    }
    return this.patientsService.deletePatient(id);
  }
}

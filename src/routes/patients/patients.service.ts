import { Injectable } from '@nestjs/common';
import { Prisma, Patient } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { PatientDto } from './Interfaces/patients.dto';

@Injectable()
export class PatientsService {
  constructor(private _prisma: PrismaService) {}

  async getPatient(): Promise<Patient[]> {
    return await this._prisma.patient.findMany();
  }

  async getPatientById(
    patientId: Prisma.PatientWhereUniqueInput,
  ): Promise<Patient | null> {
    return await this._prisma.patient.findUnique({ where: patientId });
  }

  async getPatientsByInput(input: string): Promise<Patient[] | null> {
    //const parsedInput = parseInt(input);
    return await this._prisma.patient.findMany({
      where: {
        OR: [
          { firstname: { contains: input } },
          { lastname: { contains: input } },
          { email: { contains: input } },
          //{ phone: { contains: parsedInput } },
        ],
      },
    });
  }

  async createPatient(dto: PatientDto): Promise<Patient> {
    const data: Prisma.PatientCreateInput = {
      firstname: dto.firstname,
      lastname: dto.lastname,
      adress1: dto.adress1,
      adress2: dto.adress2,
      zipcode: dto.zipcode,
      city: dto.city,
      email: dto.email,
      phone: dto.phone,
    };
    return this._prisma.patient.create({ data });
  }

  async updatePatient(params: {
    patientId: number;
    data: Prisma.PatientUpdateInput;
  }) {
    const { patientId, data } = params;
    return this._prisma.patient.update({
      where: { id: patientId },
      data,
    });
  }

  async deletePatient(patientId: number): Promise<Patient> {
    return await this._prisma.patient.delete({
      where: {
        id: patientId,
      },
    });
  }
}

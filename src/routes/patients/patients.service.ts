import { Injectable } from '@nestjs/common';
import { Prisma, Patient } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

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
}

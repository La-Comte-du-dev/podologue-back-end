import { Injectable } from '@nestjs/common';
import { Prisma, Appointment } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { AppointmentDto } from './Appointments.dto';

@Injectable()
export class AppointmentsService {
  constructor(private _prisma: PrismaService) {}

  async getAppointments(): Promise<Appointment[]> {
    return await this._prisma.appointment.findMany();
  }

  async getAppointmentById(
    appointmentId: Prisma.AppointmentWhereUniqueInput,
  ): Promise<AppointmentDto | null> {
    const data = await this._prisma.appointment.findUnique({
      where: appointmentId,
    });
    const AppointmentDto: AppointmentDto = {
      id: data.id,
      date: data.date,
      facture: data.facture,
      isquotation: data.isquotation,
      patientId: data.patientId,
    };
    return AppointmentDto;
  }

  async createAppointment(dto: AppointmentDto): Promise<Appointment> {
    const data: Prisma.AppointmentCreateInput = {
      date: dto.date,
      facture: dto.facture,
      isquotation: dto.isquotation,
      patientId: dto.patientId,
    };
    return this._prisma.appointment.create({ data });
  }

  async updateAppointment(params: {
    AppointmentId: number;
    data: Prisma.AppointmentUpdateInput;
  }) {
    const { AppointmentId, data } = params;
    return this._prisma.appointment.update({
      where: { id: AppointmentId },
      data,
    });
  }

  async deleteAppointment(AppointmentId: number): Promise<Appointment> {
    return await this._prisma.appointment.delete({
      where: {
        id: AppointmentId,
      },
    });
  }
}

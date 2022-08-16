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
  Appointment as AppointmentModel,
  Prisma,
  SourceEnum,
} from '@prisma/client';
import { ParamToNumberPipe } from 'src/pipe/convert/param-to-number.pipe';
import { LogService } from '../log/log.service';
import { AppointmentDto } from './appointments.dto';
import { AppointmentsService } from './appointments.service';

@ApiTags('api/appoointments')
@Controller('api/appointments')
export class AppointmentsController {
  constructor(
    private readonly AppointmentsService: AppointmentsService,
    private _logService: LogService,
  ) {}

  @ApiBody({
    type: AppointmentDto,
    description: 'Store Appointments informations',
  })

  //get all Appointments
  @Get()
  async getAppointments(): Promise<AppointmentModel[]> {
    try {
      return await this.AppointmentsService.getAppointments();
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

  //get a Appointment by his id
  @Get(':id')
  @UsePipes(ParamToNumberPipe)
  public async getAppointmentById(
    @Param('id') id: number,
  ): Promise<AppointmentDto> {
    try {
      const Appointment = await this.AppointmentsService.getAppointmentById({
        id,
      });
      if (!Appointment) {
        throw new NotFoundException('No Appointment found');
      }
      return Appointment;
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

  //post a Appointment
  @Post()
  async createAppointment(
    @Body() AppointmentData: AppointmentDto,
  ): Promise<AppointmentModel> {
    const { ...data } = AppointmentData;
    try {
      return this.AppointmentsService.createAppointment({ ...data });
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

  //update a Appointment
  @Put(':id')
  @UsePipes(ParamToNumberPipe)
  public async updateAppointment(
    @Param('id') id: number,
    @Body() AppointmentData: Prisma.AppointmentUpdateInput,
  ): Promise<AppointmentModel> {
    try {
      const { ...data } = AppointmentData;
      const Appointment = await this.AppointmentsService.getAppointmentById({
        id,
      });
      if (!Appointment) {
        throw new NotFoundException('No Appointment can be updated');
      }
      return this.AppointmentsService.updateAppointment({
        AppointmentId: id,
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

  //delete a Appointment
  @Delete(':id')
  @UsePipes(ParamToNumberPipe)
  async deleteAppointment(@Param('id') id: number): Promise<AppointmentModel> {
    try {
      const Appointment = await this.AppointmentsService.getAppointmentById({
        id,
      });
      if (!Appointment) {
        throw new NotFoundException('No Appointment found, cannot delete it');
      }
      return this.AppointmentsService.deleteAppointment(id);
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

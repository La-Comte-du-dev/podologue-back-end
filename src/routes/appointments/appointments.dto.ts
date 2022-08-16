import { ApiProperty } from '@nestjs/swagger';

export class AppointmentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  facture: string;

  @ApiProperty()
  isquotation: boolean;

  @ApiProperty()
  patientId: number;
}

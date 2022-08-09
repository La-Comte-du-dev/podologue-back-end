import { ApiProperty } from '@nestjs/swagger';

export class PatientDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  adress1: string;

  @ApiProperty()
  adress2?: string;

  @ApiProperty()
  zipcode: number;

  @ApiProperty()
  city: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  phone?: number;
}

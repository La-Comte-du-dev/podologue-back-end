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
  adress2?: string | null;

  @ApiProperty()
  zipcode: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  email?: string | null;

  @ApiProperty()
  phone?: string | null;
}
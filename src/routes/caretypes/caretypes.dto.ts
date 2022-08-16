import { ApiProperty } from '@nestjs/swagger';

export class CaretypeDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  caretypeprice?: number;
}

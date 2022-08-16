import { ApiProperty } from '@nestjs/swagger';

export class CareDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  careprice?: number;

  @ApiProperty()
  caretypeId: number;
}

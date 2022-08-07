import { ApiProperty } from '@nestjs/swagger';
import { CategoryEnum, SourceEnum } from '@prisma/client';

export class LogDto {
  @ApiProperty({ enum: SourceEnum, default: [], isArray: true })
  source: SourceEnum;

  @ApiProperty({ enum: CategoryEnum, default: [], isArray: true })
  category: CategoryEnum;

  @ApiProperty()
  component: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}

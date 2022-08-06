import { ApiProperty } from '@nestjs/swagger';
import { CategoryEnum, SourceEnum } from './interface';

export class LogDto {
  @ApiProperty({ enum: SourceEnum, default: [], isArray: true })
  source: SourceEnum[] = [];

  @ApiProperty({ enum: CategoryEnum, default: [], isArray: true })
  category: CategoryEnum[] = [];

  @ApiProperty()
  component: String;

  @ApiProperty()
  message: String;
}

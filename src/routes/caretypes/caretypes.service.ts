import { Injectable } from '@nestjs/common';
import { Prisma, CareType } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { CaretypeDto } from './Caretypes.dto';

@Injectable()
export class CaretypesService {
  constructor(private _prisma: PrismaService) {}

  async getCareTypes(): Promise<CareType[]> {
    return await this._prisma.careType.findMany();
  }

  async getCareTypeById(
    caretypeId: Prisma.CareTypeWhereUniqueInput,
  ): Promise<CaretypeDto | null> {
    const data = await this._prisma.careType.findUnique({ where: caretypeId });
    const CaretypeDto: CaretypeDto = {
      id: data.id,
      name: data.name,
      caretypeprice: data.caretypeprice,
    };
    return CaretypeDto;
  }

  async createCareType(dto: CaretypeDto): Promise<CareType> {
    const data: Prisma.CareTypeCreateInput = {
      name: dto.name,
      caretypeprice: dto.caretypeprice,
    };
    return this._prisma.careType.create({ data });
  }

  async updateCareType(params: {
    caretypeId: number;
    data: Prisma.CareTypeUpdateInput;
  }) {
    const { caretypeId, data } = params;
    return this._prisma.careType.update({
      where: { id: caretypeId },
      data,
    });
  }

  async deleteCareType(caretypeId: number): Promise<CareType> {
    return await this._prisma.careType.delete({
      where: {
        id: caretypeId,
      },
    });
  }
}

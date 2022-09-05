import { Injectable } from '@nestjs/common';
import { Prisma, Care } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { CareDto } from './Cares.dto';

@Injectable()
export class CaresService {
  constructor(private _prisma: PrismaService) {}

  async getCare(): Promise<Care[]> {
    return await this._prisma.care.findMany();
  }

  async getCareById(
    careId: Prisma.CareWhereUniqueInput,
  ): Promise<CareDto | null> {
    const data = await this._prisma.care.findUnique({ where: careId });
    const CareDto: CareDto = {
      id: data.id,
      name: data.name,
      careprice: data.careprice,
      caretypeId: data.caretypeId,
    };
    return CareDto;
  }

  async createCare(dto: CareDto): Promise<Care> {
    const data: Prisma.CareCreateInput = {
      name: dto.name,
      careprice: dto.careprice,
      caretype: dto.caretypeId,
    };
    return this._prisma.care.create({ data });
  }

  async updateCare(params: { careId: number; data: Prisma.CareUpdateInput }) {
    const { careId, data } = params;
    return this._prisma.care.update({
      where: { id: careId },
      data,
    });
  }

  async deleteCare(careId: number): Promise<Care> {
    return await this._prisma.care.delete({
      where: {
        id: careId,
      },
    });
  }
}

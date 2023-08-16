import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomeDto } from './dto/home.dto';

@Injectable()
export class HomeService {
  constructor(private readonly prisma: PrismaService) {}
  async getHomes():Promise<HomeDto[]> {
    const homes = await this.prisma.home.findMany();
    return homes.map(home=>new HomeDto(home));
  }
 async getHomeById(id: number) {
    return {};
  }

}

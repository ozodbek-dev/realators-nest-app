import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { HomeService } from './home.service';
import { Home } from '@prisma/client';
import { HomeDto } from './dto/home.dto';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  getHomes(): Promise<HomeDto[]> {
    return this.homeService.getHomes();
  }
  @Get(':id')
  getHomeById(@Param('id') id: number) {
    return this.homeService.getHomeById(id);
  }
  @Post()
  createHome() {
    return {};
  }
  @Put(':id')
  updateHome(@Param('id') id: number) {
    return {};
  }

  @Delete(':id')
  deleteHome(@Param('id') id: number) {
    return {};
  }
}

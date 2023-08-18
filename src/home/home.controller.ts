import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { Home, PropertyType } from '@prisma/client';
import {
  CreateHomeResponseDto,
  HomeResponseDto,
  UpdateHomeResponseDto,
} from './dto/home.dto';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  getHomes(
    @Query('city') city?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('propertyType') propertyType?: PropertyType,
  ): Promise<HomeResponseDto[]> {
    const price =
      minPrice || maxPrice
        ? {
            ...(minPrice && { gte: parseFloat(minPrice) }),
            ...(maxPrice && { lte: parseFloat(maxPrice) }),
          }
        : undefined;
    const filters = {
      ...(city && { city }),
      ...(price && { price }),
      ...(propertyType && { propertyType }),
    };
    return this.homeService.getHomes(filters);
  }
  @Get(':id')
  getHomeById(@Param('id') id: number): Promise<HomeResponseDto> {
    return this.homeService.getHomeById(id);
  }
  @Post()
  createHome(
    @Body()
    body: CreateHomeResponseDto,
  ): Promise<HomeResponseDto> {
    console.log(body);
    return this.homeService.createHome(body);
  }
  @Put(':id')
  updateHome(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateHomeResponseDto,
  ): Promise<HomeResponseDto> {
    return this.homeService.updateHome(id, body);
  }

  @Delete(':id')
  deleteHome(@Param('id', ParseIntPipe) id: number) {
    return this.homeService.deleteHomeById(id);
  }
}

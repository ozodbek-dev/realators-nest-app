import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { Home, PropertyType } from '@prisma/client';
import { CreateHomeDto, HomeDto } from './dto/home.dto';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  getHomes(
    @Query('city') city?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('propertyType') propertyType?: PropertyType,
  ): Promise<HomeDto[]> {
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
  getHomeById(@Param('id') id: number): Promise<HomeDto> {
    return this.homeService.getHomeById(id);
  }
  @Post()
  createHome(
    @Body()
   body: CreateHomeDto,
  ) {
    console.log(body)
    return this.homeService.createHome(body);
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

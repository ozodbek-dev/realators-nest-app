import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { PropertyType } from '@prisma/client';
import {
  CreateHomeResponseDto,
  HomeResponseDto,
  UpdateHomeResponseDto,
} from './dto/home.dto';
import { User, UserInfoType } from 'src/user/decorators/user.decorator';

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
    @User() user: UserInfoType,
  ): Promise<HomeResponseDto> {
    return this.homeService.createHome(body, user.id);
  }
  @Put(':id')
   async updateHome(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateHomeResponseDto,
    @User() user: UserInfoType,
  ): Promise<HomeResponseDto> {
    const realtor = await this.homeService.getRealtorByHomeId(id)
    if(realtor.id !== user.id){
      throw new NotFoundException('Realtor not found')
    }
    return this.homeService.updateHome(id, body);
  }

  @Delete(':id')
  async deleteHome(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserInfoType,
  ) {
     const realtor = await this.homeService.getRealtorByHomeId(id);
     if (realtor.id !== user.id) {
       throw new NotFoundException('Realtor not found');
     }
    return this.homeService.deleteHomeById(id);
  }
}

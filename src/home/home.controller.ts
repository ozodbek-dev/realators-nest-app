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
  UnauthorizedException,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { PropertyType, UserType } from '@prisma/client';
import {
  CreateHomeResponseDto,
  HomeResponseDto,
  InquireDto,
  UpdateHomeResponseDto,
} from './dto/home.dto';
import { User, UserInfoType } from 'src/user/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guards';
import { Roles } from 'src/decorators/roles.decorators';

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
  @Roles(UserType.REALTOR, UserType.ADMIN)
  @Post()
  createHome(
    @Body()
    body: CreateHomeResponseDto,
    @User() user: UserInfoType,
  ): Promise<HomeResponseDto> {
    return this.homeService.createHome(body, user.id);
  }
  @Roles(UserType.REALTOR, UserType.ADMIN)
  @Put(':id')
  async updateHome(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateHomeResponseDto,
    @User() user: UserInfoType,
  ): Promise<HomeResponseDto> {
    const realtor = await this.homeService.getRealtorByHomeId(id);
    if (realtor.id !== user.id) {
      throw new NotFoundException(
        'No permission! You can only change your own information ',
      );
    }
    return this.homeService.updateHome(id, body);
  }
  @Roles(UserType.REALTOR, UserType.ADMIN)
  @Delete(':id')
  async deleteHome(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserInfoType,
  ) {
    const realtor = await this.homeService.getRealtorByHomeId(id);
    if (realtor.id !== user.id) {
      throw new NotFoundException(
        'No permission! You can only change your own information ',
      );
    }
    return this.homeService.deleteHomeById(id);
  }

  @Roles(UserType.BUYER)
  @Post('/inquire/:id')
  inquire(
    @Param('id', ParseIntPipe) homeId: number,
    @User() user: UserInfoType,
    @Body() { message }: InquireDto,
  ) {
    return this.homeService.inquire(user, homeId, message);
  }

  @Roles(UserType.REALTOR)
  @Get('/:id/messages')
  async getHomeMessages(
    @Param('id', ParseIntPipe) homeId: number,
    @User() user: UserInfoType,
  ) {
    const realtor = await this.homeService.getRealtorByHomeId(homeId);
    console.log(realtor, user)
    if (realtor.id !== user.id) {
      throw new UnauthorizedException()
    }
    return this.homeService.getHomeMessages(homeId);
  }
}

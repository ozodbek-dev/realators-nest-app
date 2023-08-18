import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomeDto } from './dto/home.dto';
import { Image, PropertyType } from '@prisma/client';

interface GetHomesParam{
  city?: string;
  price?: {
    gte?: number;
    lte?: number;
  },
  propertyType?: PropertyType;

}
interface CreateHomeParams {
  address: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  city: string;
  landSize: number;
  price: number;
  propertyType: PropertyType;
  images: {
    url: string;
  }[];
}

@Injectable()
export class HomeService {
  constructor(private readonly prisma: PrismaService) {}
  async getHomes(filters: GetHomesParam): Promise<HomeDto[]> {
    const homes = await this.prisma.home.findMany({
      select: {
        id: true,
        address: true,
        city: true,
        price: true,
        propertyType: true,
        number_of_bedrooms: true,
        number_of_bathrooms: true,
        images: {
          select: {
            url: true,
          },
          take: 1,
        },
      },
      where: filters,
    });

    if (!homes.length) {
      throw new NotFoundException('No homes found');
    }
    return homes.map((home) => {
      const fetchHome = { ...home, image: home.images[0].url };
      delete fetchHome.images;
      return new HomeDto(fetchHome);
    });
  }
  async getHomeById(id: number) {
    const uniqiueHome = await this.prisma.home.findUnique({
      where: {
        id,
      },
    });
    if (!uniqiueHome) {
      throw new NotFoundException('Home not found');
    }
    return new HomeDto(uniqiueHome);
  }

  async createHome({
    address,
    city,
    numberOfBathrooms,
    numberOfBedrooms,
    landSize,
    propertyType,
    price,
    images
  }: CreateHomeParams) {
    const home = await this.prisma.home.create({
      data: {
        address,
        city,
        number_of_bedrooms: numberOfBathrooms,
        number_of_bathrooms: numberOfBedrooms,
        land_size: landSize,
        propertyType,
        price,
        realtor_id: 4,
      },

    });
    const homeImages = images.map(img => ({ ...img, home_id: home.id }))

    await this.prisma.image.createMany({
      data:homeImages
    })

    return new HomeDto(home);
  }
}

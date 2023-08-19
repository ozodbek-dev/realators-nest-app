import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomeResponseDto } from './dto/home.dto';
import { Image, PropertyType } from '@prisma/client';
import { Http2ServerResponse } from 'http2';
import { response } from 'express';

interface GetHomesParam {
  city?: string;
  price?: {
    gte?: number;
    lte?: number;
  };
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
interface UpdateHomeParams {
  address?: string;
  numberOfBedrooms?: number;
  numberOfBathrooms?: number;
  city?: string;
  landSize?: number;
  price?: number;
  propertyType?: PropertyType;
}

@Injectable()
export class HomeService {
  constructor(private readonly prisma: PrismaService) {}
  async getHomes(filters: GetHomesParam): Promise<HomeResponseDto[]> {
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
      return new HomeResponseDto(fetchHome);
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
    return new HomeResponseDto(uniqiueHome);
  }

  async createHome({
    address,
    city,
    numberOfBathrooms,
    numberOfBedrooms,
    landSize,
    propertyType,
    price,
    images,
  }: CreateHomeParams, userId:number) {
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
    const homeImages = images.map((img) => ({ ...img, home_id: home.id }));

    await this.prisma.image.createMany({
      data: homeImages,
    });

    return new HomeResponseDto(home);
  }

  async updateHome(id: number, data: UpdateHomeParams) {
    const home = await this.prisma.home.findUnique({
      where: {
        id,
      },
    });
    if (!home) {
      throw new NotFoundException('Home not found');
    }

    const updatedHome = await this.prisma.home.update({
      where: {
        id,
      },
      data,
    });

    return new HomeResponseDto(updatedHome);
  }

  async deleteHomeById(id: number) {
     const home = await this.prisma.home.findUnique({
       where: {
         id,
       },
     });
    
     if (!home) {
       throw new NotFoundException('Home not found');
     }
    await this.prisma.home.delete({
      where: {
        id,
      },
    })

    await this.prisma.image.deleteMany({
      where: {
        home_id: id,
      },
    })

    return {
      msg: "Home deleted successfully",
      success:true
    }
  }
  async getRealtorByHomeId(id: number) {
    const home = await this.prisma.home.findUnique({
      where: {
        id,
      },
      select: {
        realtor: {
          select: {
            name: true,
            id: true,
            email: true,
            phone:true
        }
      }
        
      }
    })
    if (!home) {
      throw new NotFoundException('Home not found');
    }
    return home.realtor
  }
}

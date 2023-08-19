import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomeResponseDto } from './dto/home.dto';
import { Image, PropertyType } from '@prisma/client';
import { Http2ServerResponse } from 'http2';
import { response } from 'express';
import { UserInfoType } from 'src/user/decorators/user.decorator';

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
export const homeSelect = {
  select: {
    id: true,
    address: true,
    city: true,
    price: true,
    propertyType: true,
    number_of_bedrooms: true,
    number_of_bathrooms: true,
    images:true
  },
};
@Injectable()
export class HomeService {
  constructor(private readonly prisma: PrismaService) {}
  async getHomes(filters: GetHomesParam): Promise<HomeResponseDto[]> {
    console.log(filters)
    const homes = await this.prisma.home.findMany({
     ...homeSelect,
      where: filters,
    });

    if (!homes.length) {
      throw new NotFoundException('No homes found');
    }
    let fetchHome;
    return homes.map((home) => {
      if (home?.images?.length) {
           fetchHome = { ...home, image: home?.images[0].url};
      }
      else {
        fetchHome = { ...home, image: ''};
      }
    
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
        realtor_id: userId,
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

  async inquire(buyer: UserInfoType, homeId: number, message: string) {
    const realtor = await this.getRealtorByHomeId(homeId)
    const newMessage = await this.prisma.message.create({
      data: {
        realtor_id: realtor.id,
        buyer_id: buyer.id,
        home_id: homeId,
        message
      }
    })
    return {success:true, msg:"Message sent"}
  }
  async getHomeMessages( homeId: number) {
    const messages = await this.prisma.message.findMany({
      where: {
        home_id: homeId
      }, 
      select: {
        message: true,
        buyer: {
          select: {
            name: true,
            phone: true,
            email:true,
          }
        }
      }
    })
    return messages
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { HomeService, homeSelect } from './home.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PropertyType } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

const mockGetHomes = [
  {
    id: 7,
    address: 'Bukhara, Uzbekistan',
    city: 'Bukhara',
    price: 300000,
    propertyType: PropertyType.CONDO,
    number_of_bedrooms: 2,
    number_of_bathrooms: 4,
    image:
      'https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
];

const mockCreateHome = {
  id: 24,
  address: 'Khorasm, Uzbekistan',
  number_of_bedrooms: 2,
  number_of_bathrooms: 5,
  city: 'Khorasm',
  listed_date: '2023-08-19T13:09:49.776Z',
  price: 300000,
  land_size: 200,
  propertyType: PropertyType.CONDO,
  realtor_id: 8,
};
let mockImages = [
  {
    url: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1664193968881-e3a50535c08c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
];

let prisma: PrismaService;

describe('HomeService', () => {
  let service: HomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HomeService,
        {
          provide: PrismaService,
          useValue: {
            home: {
              findMany: jest.fn().mockReturnValue(mockGetHomes),
              create: jest.fn().mockReturnValue(mockCreateHome),
            },
            image: {
              createMany: jest.fn().mockReturnValue(mockImages),
            },
          },
        },
      ],
    }).compile();

    service = module.get<HomeService>(HomeService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('getHomes', () => {
    const filters = {
      city: 'Bukhara',
      price: {
        gte: 1000,
        lte: 400000,
      },
      propertyType: PropertyType.CONDO,
    };
    it('should call prisma findMany with correct params ', async () => {
      const mockPrismaFindmanyHomes = jest.fn().mockReturnValue(mockGetHomes);
      jest
        .spyOn(prisma.home, 'findMany')
        .mockImplementation(mockPrismaFindmanyHomes);

      await service.getHomes(filters);
      expect(mockPrismaFindmanyHomes).toBeCalledWith({
        ...homeSelect,
        where: filters,
      });
    });
    it('should throw not found exception if homes are not found', async () => {
      const mockPrismaFindmanyHomes = jest.fn().mockReturnValue([]);
      jest
        .spyOn(prisma.home, 'findMany')
        .mockImplementation(mockPrismaFindmanyHomes);

      await expect(service.getHomes(filters)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
  describe('create', () => {
    const mockHomeParams = {
      numberOfBedrooms: 5,
      numberOfBathrooms: 2,
      city: 'Khorasm',
      price: 300000,
      address: 'Khorasm, Uzbekistan',
      landSize: 200,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        },
        {
          url: 'https://plus.unsplash.com/premium_photo-1664193968881-e3a50535c08c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        },
      ],
      propertyType: PropertyType.CONDO,
    };
    it('should call prisma home.create with correct payload', async () => {
      const mockCreatingHome = jest.fn().mockReturnValue(mockCreateHome);
      jest.spyOn(prisma.home, 'create').mockImplementation(mockCreatingHome);
      await service.createHome(mockHomeParams, 8);
      expect(mockCreatingHome).toBeCalledWith({
        data: {
          address: mockCreateHome.address,
          city: mockCreateHome.city,
          number_of_bedrooms: mockCreateHome.number_of_bedrooms,
          number_of_bathrooms: mockCreateHome.number_of_bathrooms,
          land_size: mockCreateHome.land_size,
          propertyType:mockCreateHome.propertyType,
          price: mockCreateHome.price,
          realtor_id: 8,
        },
      });
    });
    it("should call prisma image.createMany with the correct payload",async () => { 
            const mockCareateImageFn = jest.fn().mockReturnValue(mockImages);
            jest
              .spyOn(prisma.image, 'createMany')
              .mockImplementation(mockCareateImageFn);
            await service.createHome(mockHomeParams, 8);
            expect(mockCareateImageFn).toBeCalledWith({
              data: [
                {
                  url: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
                  home_id: 24,
                },
                {
                  url: 'https://plus.unsplash.com/premium_photo-1664193968881-e3a50535c08c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
                  home_id: 24,
                },
              ],
            });
    }
    )
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { HomeService, homeSelect } from './home.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PropertyType } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';
import { HomeController } from './home.controller';
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

let prisma: PrismaService;
let homeService: HomeService;
describe('HomeController', () => {
  let controller: HomeController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeController],
      providers: [
        {
          provide: HomeService,
          useValue: {
            getHomes: jest.fn().mockReturnValue(mockGetHomes),
          },
        },
        PrismaService,
      ],
    }).compile();

    controller = module.get<HomeController>(HomeController);
    prisma = module.get<PrismaService>(PrismaService);
    homeService = module.get<HomeService>(HomeService);
  });

  describe('getHomes', () => {
    it('should construct filter object corectly', async () => {
      const mockGetHomesFn = jest.fn().mockReturnValue(mockGetHomes);
      jest.spyOn(homeService, 'getHomes').mockImplementation(mockGetHomesFn);
      await controller.getHomes(
        'Bukhara',
        '1000',
        '400000',
        PropertyType.CONDO,
      );
      expect(mockGetHomesFn).toBeCalledWith({
        city: 'Bukhara',
        price: {
          gte: 1000,
          lte: 400000,
        },
        propertyType: PropertyType.CONDO,
      });
    });
  });
});

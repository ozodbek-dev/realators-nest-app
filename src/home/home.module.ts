import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports : [PrismaModule],
  providers: [HomeService, {
    provide: APP_INTERCEPTOR,
    useClass: HomeService
  }],
  controllers: [HomeController],
})
export class HomeModule {}

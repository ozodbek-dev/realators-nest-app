import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guards';

@Module({
  imports : [PrismaModule],
  providers: [HomeService, {
    provide: APP_INTERCEPTOR,
    useClass: HomeService
  }
  ],
  controllers: [HomeController],
})
export class HomeModule {}

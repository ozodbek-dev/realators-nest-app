import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion:true
    }
  }))
  await app.listen(3000);
}
bootstrap();

// 1 => install postgress on our local machine
// 2 => host postgres in cloud
// Heroku.com 
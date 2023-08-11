import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// 1 => install postgress on our local machine
// 2 => host postgres in cloud
// Heroku.com 
import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  // Point directly to source folders in development
  const isDev = process.env.NODE_ENV !== 'production';
  
  app.useStaticAssets(join(process.cwd(), 'public'));
  app.setBaseViewsDir(join(process.cwd(), 'views'));  // ✅ Direct to root/views
 //app.useStaticAssets(join(__dirname, '..', 'public'));
 // app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.setViewEngine('zare');
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
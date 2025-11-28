import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';


dotenv.config({ path: '.env' });

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // strips properties not in the DTO
    forbidNonWhitelisted: true, // throws error if extra props sent
    transform: true, // auto-transform payloads to DTO class
  }));
  
  app.use(bodyParser.urlencoded({ extended: true })); // 👈 parse form data
  app.use(bodyParser.json());                         // 👈 parse json too

  app.useStaticAssets(join(__dirname, '..', 'public'));


  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('zare');
  
  // app.use(session({
  //   secret: process.env.SESSION_SECRET || 'change-this-secret',
  //   resave: false,
  //   saveUninitialized: false,
  //   store: MongoStore.create({
  //     mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/nest-blog-sessions',
  //     ttl: 14 * 24 * 60 * 60, // 14 days
  //   }),
  //   cookie: { maxAge: 14 * 24 * 60 * 60 * 1000 },
  // }));

  // app.use(passport.initialize());
  // app.use(passport.session());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

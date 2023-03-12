import { NestFactory } from '@nestjs/core';
import populateDb from './populate-db.js';
import { AppModule } from './resources/root-module/app.module.js';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  await populateDb(app);
}
bootstrap();

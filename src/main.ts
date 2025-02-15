import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appCreate } from './app.create';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * add middleware
   */
  appCreate(app);
  await app.listen(5000);
}
bootstrap();

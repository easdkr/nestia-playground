import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setOpenApi } from '../lib';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setOpenApi(app, { runOnApplicationBootstrap: true });
  await app.listen(3000);
}
bootstrap();

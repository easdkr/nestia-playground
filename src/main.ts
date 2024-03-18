import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setOpenApi } from '../lib';
import { execSync } from 'child_process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  execSync('npx nestia swagger');
  console.log('OpenAPI is available at http://localhost:3000/api/docs');
  setOpenApi(app);
  await app.listen(3000);
}
bootstrap();

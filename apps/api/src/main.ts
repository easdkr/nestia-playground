import { NestFactory } from '@nestjs/core';
import { setOpenApi } from '@common/configs';
import { ApiModule } from '@api/api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  setOpenApi(app);
  app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();

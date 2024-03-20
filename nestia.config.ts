import { ApiModule } from '@api/api.module';
import { INestiaConfig } from '@nestia/sdk';
import { NestFactory } from '@nestjs/core';

const NESTIA_CONFIG: INestiaConfig = {
  input: async () => {
    const app = await NestFactory.create(ApiModule);
    // const app = await NestFactory.create(YourModule, new FastifyAdaptor());
    // app.setGlobalPrefix("api");
    // app.enableVersioning({
    //     type: VersioningType.URI,
    //     prefix: "v",
    // })
    return app;
  },
  swagger: {
    output: 'dist/swagger.json',
    beautify: true,
    security: {
      bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Server',
      },
    ],
  },
};
export default NESTIA_CONFIG;

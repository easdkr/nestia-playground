import { INestApplication, Logger } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import * as path from 'path';

type Option = {
  runOnApplicationBootstrap?: boolean;
};

export function setOpenApi(app: INestApplication, option?: Option): void {
  const logger = new Logger('OpenAPI');
  execSync('NODE_ENV=local npx nestia swagger');
  logger.verbose('OpenAPI spec is generated');

  if (!option?.runOnApplicationBootstrap) return;

  const swagger = readFileSync(
    path.join(__dirname, '../../../swagger.json'),
    'utf8',
  );
  const document = JSON.parse(swagger);

  SwaggerModule.setup('api/docs', app, document);

  logger.verbose('OpenAPI is available at http://localhost:3000/api/docs');
}

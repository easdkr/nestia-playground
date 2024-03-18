import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import * as path from 'path';

export function setOpenApi(app: INestApplication): void {
  const swagger = readFileSync(path.join(__dirname, '../swagger.json'), 'utf8');
  const document = JSON.parse(swagger);

  SwaggerModule.setup('api/docs', app, document);
}

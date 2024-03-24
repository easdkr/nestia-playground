import { Global, Logger, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  Kysely,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
} from 'kysely';
import { DB } from 'libs/prisma/generated/types';
import kyselyExtension from 'prisma-extension-kysely';

@Global()
@Module({})
export class PrismaModule {
  public static async forRootAsync() {
    const logger = new Logger('Prisma');
    const _basePrisma = new PrismaService();

    await _basePrisma.$connect();

    _basePrisma.$on('query', (e) => {
      logger.verbose(`Query: ${e.query}`);
      logger.verbose(`Params: ${e.params}`);
      logger.verbose(`Duration: ${e.duration} ms`);
    });

    const prisma = _basePrisma.$extends(
      kyselyExtension({
        kysely: (driver) =>
          new Kysely<DB>({
            dialect: {
              createDriver: () => driver,
              createAdapter: () => new PostgresAdapter(),
              createIntrospector: (db) => new PostgresIntrospector(db),
              createQueryCompiler: () => new PostgresQueryCompiler(),
            },
          }),
      }),
    );

    return {
      module: PrismaModule,
      providers: [
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
      exports: [PrismaService],
    };
  }
}

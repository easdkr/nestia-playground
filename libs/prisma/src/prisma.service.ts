/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { Kysely } from 'kysely';
import { DB } from 'libs/prisma/generated/types';

export interface PrismaService {
  $kysely: Kysely<DB>;
}

@Injectable()
export class PrismaService
  extends PrismaClient<
    Prisma.PrismaClientOptions,
    'query' | 'info' | 'warn' | 'error'
  >
  implements OnApplicationShutdown
{
  public constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
        {
          emit: 'event',
          level: 'error',
        },
      ],
    });
  }

  async onApplicationShutdown() {
    await this.$disconnect();
    console.log('Prisma disconnected.');
  }
}

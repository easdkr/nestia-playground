import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<
    Prisma.PrismaClientOptions,
    'query' | 'info' | 'warn' | 'error'
  >
  implements OnModuleInit, OnModuleDestroy
{
  public constructor(private readonly logger: Logger) {
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

  public async onModuleInit() {
    console.log('onModuleInit');
    await this.$connect();
    this.$on('query', (e) => {
      this.logger.verbose(`Query: ${e.query}`);
      this.logger.verbose(`Params: ${e.params}`);
      this.logger.verbose(`Duration: ${e.duration} ms`);
    });
  }

  public async onModuleDestroy() {
    await this.$disconnect();
  }
}

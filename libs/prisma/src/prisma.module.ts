import { Global, Logger, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: Logger,
      useValue: new Logger('Prisma'),
    },
  ],
  exports: [PrismaService],
})
export class PrismaModule {}

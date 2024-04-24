import { ConfigModule } from '@common/configs';
import { PrismaModule } from '@common/prisma';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule, PrismaModule.forRootAsync()],
})
export class ApiModule {}

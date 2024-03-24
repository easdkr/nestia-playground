import { UserModule } from '@api/user/user.module';
import { ConfigModule } from '@common/configs';
import { PrismaModule } from '@common/prisma';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule, PrismaModule.forRootAsync(), UserModule],
})
export class ApiModule {}

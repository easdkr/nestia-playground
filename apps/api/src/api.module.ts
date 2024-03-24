import { ApiController } from '@api/api.controller';
import { ApiService } from '@api/api.service';
import { ConfigModule } from '@common/configs';
import { PrismaModule } from '@common/prisma';
import { Module } from '@nestjs/common';
@Module({
  imports: [ConfigModule, PrismaModule.forRootAsync()],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}

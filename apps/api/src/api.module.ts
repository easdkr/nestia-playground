import { ApiController } from '@api/api.controller';
import { ApiService } from '@api/api.service';
import { ConfigModule } from '@common/configs';
import { Module } from '@nestjs/common';
@Module({
  imports: [ConfigModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}

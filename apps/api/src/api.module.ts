import { ApiController } from '@api/api.controller';
import { ApiService } from '@api/api.service';
import { Module } from '@nestjs/common';
@Module({
  imports: [],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}

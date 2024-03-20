import { ApiService } from '@api/api.service';
import { TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @TypedRoute.Get()
  getHello(): string {
    return this.apiService.getHello();
  }
}

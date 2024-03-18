import { Body, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { TypedRoute } from '@nestia/core';

export type User = {
  id: number;
  name: string;
  age: number;
};

export type CreateUserDto = Pick<User, 'name' | 'age'>;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @TypedRoute.Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @TypedRoute.Post('/users')
  createUser(@Body() dto: CreateUserDto): User {
    return { id: 1, ...dto };
  }
}

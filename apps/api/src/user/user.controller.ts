import { UserService } from '@api/user/user.service';
import { TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';

type User = {
  id: number;
  email: string;
  authenticationType: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @TypedRoute.Post()
  public async create(): Promise<User> {
    return await this.userService.create();
  }
}

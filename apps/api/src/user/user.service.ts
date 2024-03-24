import { UserRepository } from '@api/user/user.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  public constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  public async create() {
    return await this.userRepository.new({
      email: 'dummy@dummy2.com',
    });
  }
}

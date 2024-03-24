import { UserController } from '@api/user/user.controller';
import { UserRepository } from '@api/user/user.repository';
import { UserService } from '@api/user/user.service';
import { PrismaService } from '@common/prisma';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UserRepository,
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) => UserRepository(prisma['user']),
    },
  ],
})
export class UserModule {}

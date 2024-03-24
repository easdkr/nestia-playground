import { PrismaService } from '@common/prisma';
import { Prisma } from '@prisma/client';

export function UserRepository(prismaUser: PrismaService['user']) {
  return Object.assign(prismaUser, {
    async findOneByEmail(email: string) {
      return prismaUser.findFirst({ where: { email } });
    },
    async new(data: Prisma.UserCreateInput, tx?: Prisma.TransactionClient) {
      console.log(data, tx);
      // const dataSource = tx?.user || prismaUser;
      return await prismaUser.create({ data });
    },
  });
}

export type UserRepository = ReturnType<typeof UserRepository>;

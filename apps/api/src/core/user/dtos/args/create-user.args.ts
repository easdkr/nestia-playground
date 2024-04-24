import { IUser } from '@api/core/user/dtos/args/user.interface';

export interface CreateUserArgs {
  password: IUser['password'];
  email: IUser['email'];
  authenticationType: IUser['authenticationType'];
  encryptPassword: (password: IUser['password']) => Promise<string> | string;
}

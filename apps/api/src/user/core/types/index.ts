import { PasswordEntity } from '@api/user/core/entities/password.entity';
import { tags } from 'typia';

export interface IUser {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  password?: PasswordEntity;
  email: string;
  authenticationType: string;
}

export interface IPassword {
  id?: number;
  userId?: number;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type CreateUserWithPasswordArgs = Omit<
  IUser,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'password'
> & {
  password: string;
} & {
  email: tags.Format<'email'>;
};

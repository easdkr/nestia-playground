import { UserCoreError } from '@api/user/core/errors/user-core.error';
import { IPassword } from '@api/user/core/types';
import typia from 'typia';

export class PasswordEntity {
  private _id?: number;
  private _userId?: number;
  private _password!: string;

  private _createdAt?: Date;
  private _updatedAt?: Date;
  private _deletedAt?: Date | null;

  public constructor(args: IPassword) {
    this._id = args.id;
    this._userId = args.userId;
    this._password = args.password;
    this._createdAt = args.createdAt;
    this._updatedAt = args.updatedAt;
    this._deletedAt = args.deletedAt;
  }

  public get id(): number {
    if (!typia.is<number>(this._id))
      throw UserCoreError.validationFailed('Password ID is not a number');

    return this._id;
  }

  public get userId(): number {
    if (!typia.is<number>(this._userId))
      throw UserCoreError.validationFailed('Password userId is not a number');

    return this._userId;
  }

  public get password(): string {
    if (!typia.is<string>(this._password))
      throw UserCoreError.validationFailed('Password password is not a string');

    return this._password;
  }

  public get createdAt(): Date {
    if (!typia.is<Date>(this._createdAt))
      throw UserCoreError.validationFailed('Password createdAt is not a date');

    return this._createdAt;
  }

  public get updatedAt(): Date {
    if (!typia.is<Date>(this._updatedAt))
      throw UserCoreError.validationFailed('Password updatedAt is not a date');

    return this._updatedAt;
  }

  public get deletedAt(): Date {
    if (!typia.is<Date>(this._deletedAt))
      throw UserCoreError.validationFailed('Password deletedAt is not a date');

    return this._deletedAt;
  }
}

import { PasswordEntity } from '@api/user/core/entities/password.entity';
import { UserCoreError } from '@api/user/core/errors/user-core.error';
import { CreateUserWithPasswordArgs, IUser } from '@api/user/core/types';
import typia, { json } from 'typia';

export class UserEntity {
  private _email!: string;
  private _authenticationType!: string;

  private _id?: number;
  private _createdAt?: Date;
  private _updatedAt?: Date;
  private _deletedAt?: Date | null;

  private _password?: PasswordEntity;

  public constructor(args: IUser) {
    this._id = args.id;
    this._createdAt = args.createdAt;
    this._updatedAt = args.updatedAt;
    this._deletedAt = args.deletedAt;
    this._email = args.email;
    this._password = args.password;
    this._authenticationType = args.authenticationType;
  }

  public static createWithPassword(
    args: CreateUserWithPasswordArgs,
  ): UserEntity {
    const validate = typia.validate<CreateUserWithPasswordArgs>(args);

    if (!validate.success) {
      throw UserCoreError.validationFailed(json.stringify(validate.errors));
    }

    return new UserEntity({
      email: args.email,
      password: new PasswordEntity({
        password: args.password,
      }),
      authenticationType: args.authenticationType,
    });
  }

  public get id(): number {
    if (!typia.is<number>(this._id))
      throw UserCoreError.validationFailed('User ID is not a number');

    return this._id;
  }

  public get createdAt(): Date {
    if (!typia.is<Date>(this._createdAt))
      throw UserCoreError.validationFailed('User createdAt is not a date');

    return this._createdAt;
  }

  public get updatedAt(): Date {
    if (!typia.is<Date>(this._updatedAt))
      throw UserCoreError.validationFailed('User updatedAt is not a date');

    return this._updatedAt;
  }

  public get deletedAt(): Date {
    if (!typia.is<Date>(this._deletedAt))
      throw UserCoreError.validationFailed('User deletedAt is not a date');

    return this._deletedAt;
  }

  public get email(): string {
    if (!typia.is<string>(this._email))
      throw UserCoreError.validationFailed('User email is not a string');

    return this._email;
  }

  public get password(): PasswordEntity {
    if (!this._password || !(this._password instanceof PasswordEntity))
      throw UserCoreError.validationFailed(
        'User password is not a PasswordEntity',
      );

    return this._password;
  }

  public get authenticationType(): string {
    if (!typia.is<string>(this._authenticationType))
      throw UserCoreError.validationFailed(
        'User authenticationType is not a string',
      );

    return this._authenticationType;
  }
}

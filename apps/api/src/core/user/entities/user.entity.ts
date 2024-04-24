import { CreateUserArgs, IUser } from '@api/core/user/dtos/args';
import { LocalDateTime } from 'js-joda';
import typia, { json, tags } from 'typia';

export class User {
  private _id?: IUser['id'];
  private _email: IUser['email'];
  private _authenticationType: IUser['authenticationType'];
  private _password?: IUser['password'];
  private _createdAt?: IUser['createdAt'];
  private _updatedAt?: IUser['updatedAt'];
  private _deletedAt?: IUser['deletedAt'];

  private constructor(
    args: Pick<IUser, 'email' | 'authenticationType' | 'password'> &
      Partial<IUser>,
  ) {
    this._id = args.id;
    this._email = args.email;
    this._authenticationType = args.authenticationType;
    this._password = args.password;
    this._createdAt = args.createdAt;
    this._updatedAt = args.updatedAt;
    this._deletedAt = args.deletedAt;
  }

  /**
   * 새로운 사용자를 생성합니다.
   */
  public static async create(args: CreateUserArgs): Promise<User> {
    const validate = typia.validate<CreateUserArgs>(args);
    if (!validate.success) {
      throw new Error(json.stringify(validate.errors));
    }

    return new User({
      email: args.email,
      authenticationType: args.authenticationType,
      password: await args.encryptPassword(args.password),
    });
  }

  /**
   * 다른 소스로부터 사용자를 생성합니다.
   */
  public static from(args: IUser): User {
    const validate = typia.validate<IUser>(args);
    if (!validate.success) {
      throw new Error(json.stringify(validate.errors));
    }

    return new User({
      id: args.id,
      email: args.email,
      authenticationType: args.authenticationType,
      password: args.password,
      createdAt: args.createdAt,
      updatedAt: args.updatedAt,
      deletedAt: args.deletedAt,
    });
  }

  public get id(): number & tags.Minimum<1> & tags.Type<'int64'> {
    if (!this._id) {
      throw new Error('User ID is not defined');
    }

    return this._id;
  }

  public get email(): string & tags.Format<'email'> {
    return this._email;
  }

  public get authenticationType(): string {
    return this._authenticationType;
  }

  public get password(): IUser['password'] {
    if (!this._password) {
      throw new Error('User password is not defined');
    }

    return this._password;
  }

  public get createdAt(): LocalDateTime {
    if (!this._createdAt) {
      throw new Error('User createdAt is not defined');
    }

    return this._createdAt;
  }

  public get updatedAt(): LocalDateTime {
    if (!this._updatedAt) {
      throw new Error('User updatedAt is not defined');
    }

    return this._updatedAt;
  }

  public get deletedAt(): LocalDateTime | null {
    if (this._deletedAt === undefined) {
      throw new Error('User deletedAt is not defined');
    }

    return this._deletedAt;
  }
}

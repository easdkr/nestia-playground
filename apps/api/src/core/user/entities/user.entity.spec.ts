import { IUser } from '@api/core/user/dtos/args';
import { User } from '@api/core/user/entities/user.entity';
import { LocalDateTime } from 'js-joda';

describe('UserEntity', () => {
  describe('새 유저 생성', () => {
    it('비밀번호 암호화 함수 전달 테스트 (비동기)', async () => {
      // given
      class Test {
        public constructor(
          private readonly encryptPassword: (
            password: string,
          ) => Promise<string>,
        ) {}

        public createNewUser(): Promise<User> {
          return User.create({
            email: 'test@email.net',
            authenticationType: 'email',
            password: 'test1!',
            encryptPassword: this.encryptPassword,
          });
        }
      }

      // when
      const test = new Test((password: string) =>
        Promise.resolve(`${password}:encrypted`),
      );
      const user = await test.createNewUser();

      // then
      expect(user.password).toBe('test1!:encrypted');
    });

    it('비밀번호 암호화 함수 전달 테스트 (동기)', async () => {
      // given
      class Test {
        public constructor(
          private readonly encryptPassword: (password: string) => string,
        ) {}

        public createNewUser(): Promise<User> {
          return User.create({
            email: 'test@email.net',
            authenticationType: 'email',
            password: 'test1!',
            encryptPassword: this.encryptPassword,
          });
        }
      }

      // when
      const test = new Test((password: string) => `${password}:encrypted`);
      const user = await test.createNewUser();

      // then
      expect(user.password).toBe('test1!:encrypted');
    });

    it('생성 실패', async () => {
      // given
      const invalidArgs = {
        email: 'test',
        authenticationType: 'email',
        password: 'test1!',
        encryptPassword: async (password: string) => password,
      };

      // when
      const received = () => User.create(invalidArgs);

      // then
      expect(received).rejects.toThrow();
    });
  });

  describe('기존 유저 객체 생성', () => {
    it('유저 객체 생성 성공', () => {
      // given
      const args: IUser = {
        id: 1,
        email: 'test@test.com',
        authenticationType: 'email',
        password: 'test1!',
        createdAt: LocalDateTime.now(),
        updatedAt: LocalDateTime.now(),
        deletedAt: null,
      };

      // when
      const user = User.from(args);

      // then
      expect(user.id).toBe(1);
      expect(user.email).toBe('test@test.com');
      expect(user.authenticationType).toBe('email');
      expect(user.password).toBe('test1!');
      expect(user.createdAt).toEqual(expect.any(LocalDateTime));
      expect(user.updatedAt).toEqual(expect.any(LocalDateTime));
      expect(user.deletedAt).toBeNull();
    });

    it('email 형식이 아닌 경우 에러 발생', () => {
      // given
      const args: IUser = {
        id: 1,
        email: 'test',
        authenticationType: 'email',
        password: 'test1!',
        createdAt: LocalDateTime.now(),
        updatedAt: LocalDateTime.now(),
        deletedAt: null,
      };

      // when
      const received = () => User.from(args);

      // then
      expect(received).toThrow();
    });
  });
});

import { UserEntity } from '@api/user/core/entities/user.entity';
import { CreateUserWithPasswordArgs } from '@api/user/core/types';

describe('UserEntity', () => {
  describe('createWithPassword', () => {
    it('should create a new user with a password', () => {
      // given
      const args: CreateUserWithPasswordArgs = {
        email: 'test@test.com',
        password: 'test',
        authenticationType: 'email',
      };

      // when
      const user = UserEntity.createWithPassword(args);

      // then
      expect(user).toBeInstanceOf(UserEntity);
      expect(user.email).toBe('test@test.com');
      expect(user.password.password).toBe('test');
      expect(user.authenticationType).toBe('email');
    });

    it('should throw an error if the email is invalid', () => {
      // given
      const args: CreateUserWithPasswordArgs = {
        email: 'invalid-email',
        password: 'test',
        authenticationType: 'email',
      };

      // when
      const user = () => UserEntity.createWithPassword(args);

      // then
      expect(user).toThrow();
    });
  });
});

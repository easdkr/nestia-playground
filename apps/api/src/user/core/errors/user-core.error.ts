import { BaseCoreError } from '@api/user/core/errors/base-core.error';

export class UserCoreError extends BaseCoreError {
  public static validationFailed(message: string) {
    return new UserCoreError('USER_VALIDATION_FAILED', message);
  }
}

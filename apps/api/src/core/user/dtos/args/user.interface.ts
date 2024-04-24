import { LocalDateTime } from 'js-joda';
import { tags } from 'typia';
import { Pattern } from 'typia/lib/tags';

export interface IUser {
  id: number & tags.Minimum<1> & tags.Type<'int64'>;
  email: string & tags.Format<'email'>;
  authenticationType: string;
  password: string &
    Pattern<'(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,20}'>;
  createdAt: LocalDateTime;
  updatedAt: LocalDateTime;
  deletedAt: LocalDateTime | null;
}

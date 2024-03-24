import type { ColumnType } from 'kysely';
export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Password = {
  id: Generated<number>;
  user_id: number;
  password: string;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp;
  deleted_at: Timestamp | null;
};
export type Profile = {
  id: Generated<number>;
  user_id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp;
  deleted_at: Timestamp | null;
};
export type User = {
  id: Generated<number>;
  email: string;
  authentication_type: Generated<string>;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp;
  deleted_at: Timestamp | null;
};
export type DB = {
  _users: User;
  passwords: Password;
  profiles: Profile;
};

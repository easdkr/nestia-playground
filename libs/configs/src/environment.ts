export type NodeEnvironment = 'development' | 'production' | 'test' | 'local';

export interface IEnvironment {
  NODE_ENV: NodeEnvironment;
  DATABASE_URL: string;
}

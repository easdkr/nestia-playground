import { ConfigService } from '@common/configs/config.service';
import { IEnvironment } from '@common/configs/environment';
import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import typia from 'typia';

console.log(`${process.env.NODE_ENV}`);
@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/libs/configs/env/.env.${process.env.NODE_ENV}`,
      validate: (config) => {
        const env = typia.validate<IEnvironment>(config);
        if (env.success) return env.data;

        console.error(env.errors);
        throw new Error('Config validation error');
      },
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}

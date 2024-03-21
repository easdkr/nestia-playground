import { IEnvironment } from '@common/configs/environment';
import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService extends NestConfigService<IEnvironment> {
  public constructor() {
    super();
  }
}

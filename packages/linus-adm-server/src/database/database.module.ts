import { Global, Module } from '@nestjs/common';
import { EnvConfigProvider } from './config.provider';

@Global()
@Module({
  providers: [EnvConfigProvider],
  exports: [EnvConfigProvider],
})
export class DatabaseModule {}

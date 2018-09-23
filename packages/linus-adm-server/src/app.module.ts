import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [BotModule, ConfigModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

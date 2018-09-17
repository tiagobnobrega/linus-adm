import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BotModule } from './bot/bot.module';
import { DatabaseModule } from './config/config.module';

@Module({
  imports: [BotModule, DatabaseModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { BotDao } from './dao/bot.dao';

@Module({
  imports: [],
  controllers: [BotController],
  providers: [BotDao, BotService],
})
export class BotModule {}

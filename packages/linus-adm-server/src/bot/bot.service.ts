import { Inject, Injectable } from '@nestjs/common';
import { IBot } from './bot.interface';

@Injectable()
export class BotService {
  // constructor(@Inject('BotDao') private readonly botDao: IBotDao) {}

  findAll(): Promise<IBot[]> {
    return Promise.resolve([{ name: 'bot1', globalTokenizers: [], rootTopic: 'ROOT' }]);
  }
}

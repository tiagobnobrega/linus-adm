import { Inject, Injectable } from '@nestjs/common';
import { IBot } from './bot.interface';
import { IBotDao } from './dao/bot.dao.interface';

@Injectable()
export class BotService {
  constructor(@Inject('BotDao') private readonly botDao: IBotDao) {}

  findAll(): Promise<IBot[]> {
    return this.botDao.findAll();
  }
}

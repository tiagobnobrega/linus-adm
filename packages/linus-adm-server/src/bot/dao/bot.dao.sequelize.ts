import { IBotDao } from './bot.dao.interface';
import { IBot } from '../bot.interface';

export default class BotDaoSequelize implements IBotDao {
  async findAll(): Promise<IBot[]> {
    return [
      { name: 'bot1', globalTokenizers: [], rootTopic: 'ROOT' },
      { name: 'bot2', globalTokenizers: [], rootTopic: 'ROOT' },
      { name: 'bot3', globalTokenizers: [], rootTopic: 'ROOT' },
      { name: 'bot4', globalTokenizers: [], rootTopic: 'ROOT' },
      { name: 'bot5', globalTokenizers: [], rootTopic: 'ROOT' },
      { name: 'bot6', globalTokenizers: [], rootTopic: 'ROOT' },
      { name: 'bot7', globalTokenizers: [], rootTopic: 'ROOT' },
      { name: 'bot8', globalTokenizers: [], rootTopic: 'ROOT' },
    ];
  }
}

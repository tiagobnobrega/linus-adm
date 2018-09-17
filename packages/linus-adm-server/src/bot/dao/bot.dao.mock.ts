import { IBotDao } from './bot.dao.interface';
import { IBot } from '../bot.interface';

export default class BotDaoMock implements IBotDao {
  async findAll(): Promise<IBot[]> {
    return [
      { name: 'mock1', globalTokenizers: [], rootTopic: 'ROOT' },
      { name: 'mock2', globalTokenizers: [], rootTopic: 'ROOT' },
      { name: 'mock3', globalTokenizers: [], rootTopic: 'ROOT' },
      { name: 'mock4', globalTokenizers: [], rootTopic: 'ROOT' },
      { name: 'mock5', globalTokenizers: [], rootTopic: 'ROOT' },
      { name: 'mock6', globalTokenizers: [], rootTopic: 'ROOT' },
      { name: 'mock7', globalTokenizers: [], rootTopic: 'ROOT' },
      { name: 'mock8', globalTokenizers: [], rootTopic: 'ROOT' },
    ];
  }
}

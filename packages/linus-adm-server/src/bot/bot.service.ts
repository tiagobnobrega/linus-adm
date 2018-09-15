import { Injectable } from '@nestjs/common';
import {IBot} from './bot.interface';

@Injectable()
export class BotService {
  findAll(): IBot[] {
    return [{ name:'bot1', globalTokenizers:[], rootTopic:'ROOT' }];
  }
}

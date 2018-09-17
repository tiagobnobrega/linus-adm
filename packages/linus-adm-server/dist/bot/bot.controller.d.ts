import { IBot } from './bot.interface';
import { BotService } from './bot.service';
export declare class BotController {
  private readonly botService;
  constructor(botService: BotService);
  findAll(): IBot[];
}

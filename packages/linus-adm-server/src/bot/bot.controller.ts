import { Get, Controller } from '@nestjs/common';
import { IBot } from './bot.interface';
import { BotService } from './bot.service';

@Controller('bots')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Get()
  async findAll(): Promise<IBot[]> {
    return this.botService.findAll();
  }
}

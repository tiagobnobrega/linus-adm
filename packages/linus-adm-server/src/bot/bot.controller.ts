import { Get, Controller } from '@nestjs/common';
import { IBot } from './bot.interface';
// import { AppService } from './app.service';

@Controller('bots')
export class BotController {
  // constructor(private readonly appService: AppService) {}

  @Get()
  findAll(): IBot[] {
    return [{ name:'bot1', globalTokenizers:[], rootTopic:'ROOT' }];
  }
}

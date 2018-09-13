import { Injectable } from '@nestjs/common';

@Injectable()
export class BotService {
  findOne(): string {
    return 'Hello World!!!';
  }
}

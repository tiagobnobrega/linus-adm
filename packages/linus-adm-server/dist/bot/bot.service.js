"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let BotService = class BotService {
    findAll() {
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
};
BotService = __decorate([
    common_1.Injectable()
], BotService);
exports.BotService = BotService;
//# sourceMappingURL=bot.service.js.map
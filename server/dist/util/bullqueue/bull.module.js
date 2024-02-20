"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BullConfigModule = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const config_1 = require("@nestjs/config");
const queue_service_1 = require("./queue.service");
const worker_service_1 = require("./worker.service");
const event_module_1 = require("./../../event/event.module");
let BullConfigModule = class BullConfigModule {
};
exports.BullConfigModule = BullConfigModule;
exports.BullConfigModule = BullConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.forRootAsync({
                imports: [config_1.ConfigModule, event_module_1.EventModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    redis: {
                        host: configService.get('REDIS_HOST'),
                        port: configService.get('REDIS_PORT'),
                    },
                }),
            }),
            bull_1.BullModule.registerQueue({
                name: 'events'
            }),
            event_module_1.EventModule,
        ],
        providers: [queue_service_1.QueueService, worker_service_1.WorkerService],
        exports: [queue_service_1.QueueService]
    })
], BullConfigModule);
//# sourceMappingURL=bull.module.js.map
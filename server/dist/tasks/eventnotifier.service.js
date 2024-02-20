"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EventNotifierService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventNotifierService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const event_notify_1 = require("./../event/event.notify");
const email_service_1 = require("./../util/email_service/email.service");
const queue_service_1 = require("./../util/bullqueue/queue.service");
let EventNotifierService = EventNotifierService_1 = class EventNotifierService {
    constructor(emailService, eventNotify, queueService) {
        this.emailService = emailService;
        this.eventNotify = eventNotify;
        this.queueService = queueService;
        this.logger = new common_1.Logger(EventNotifierService_1.name);
        this.running = false;
    }
    async handleCron() {
        if (!this.running) {
            this.running = true;
            this.logger.debug('Called when the current second is 30');
            const notifiableEvents = await this.eventNotify.findNotifiableEvents();
            this.logger.debug(`List of notifiable events: ${notifiableEvents}`);
            notifiableEvents.forEach((event) => {
                this.queueService.addEventToQueue(event);
            });
            this.running = false;
        }
    }
};
exports.EventNotifierService = EventNotifierService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventNotifierService.prototype, "handleCron", null);
exports.EventNotifierService = EventNotifierService = EventNotifierService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [email_service_1.EmailService,
        event_notify_1.EventNotify,
        queue_service_1.QueueService])
], EventNotifierService);
//# sourceMappingURL=eventnotifier.service.js.map
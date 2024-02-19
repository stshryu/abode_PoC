import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventNotify } from './../event/event.notify';
import { EmailService } from './../util/email_service/email.service';

@Injectable()
export class EventNotifierService {
    private readonly logger = new Logger(EventNotifierService.name);

    constructor(
        private readonly emailService: EmailService,
        private readonly eventNotify: EventNotify,
    ) {}

    running:boolean = false;

    //@Cron(CronExpression.EVERY_10_SECONDS) // For testing
    @Cron(CronExpression.EVERY_5_MINUTES)
    async handleCron(){
        if (!this.running) {
            this.running = true;
            this.logger.debug('Called when the current second is 30');
            const notifiableEvents = await this.eventNotify.findNotifiableEvents();
            console.log(notifiableEvents);
            this.logger.debug(`List of notifiable events: ${notifiableEvents}`);
            //this.emailService.sendEmail(...); Actual email service should get installed on prod
            this.running = false;
        }
    }
} 

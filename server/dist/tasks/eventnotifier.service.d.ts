import { EventNotify } from './../event/event.notify';
import { EmailService } from './../util/email_service/email.service';
import { QueueService } from './../util/bullqueue/queue.service';
export declare class EventNotifierService {
    private readonly emailService;
    private readonly eventNotify;
    private readonly queueService;
    private readonly logger;
    constructor(emailService: EmailService, eventNotify: EventNotify, queueService: QueueService);
    running: boolean;
    handleCron(): Promise<void>;
}

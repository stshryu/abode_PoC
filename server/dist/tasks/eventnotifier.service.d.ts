import { EventNotify } from './../event/event.notify';
import { EmailService } from './../util/email_service/email.service';
export declare class EventNotifierService {
    private readonly emailService;
    private readonly eventNotify;
    private readonly logger;
    constructor(emailService: EmailService, eventNotify: EventNotify);
    running: boolean;
    handleCron(): Promise<void>;
}

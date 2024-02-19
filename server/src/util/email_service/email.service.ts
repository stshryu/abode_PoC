import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService{
    private readonly logger = new Logger(EmailService.name);
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {},
        });
    }

    async sendEmail(to: string, subject: string, text: string) {
        this.logger.log(`Sending email to ${to}, ${subject}, ${text}`);
    }
}

import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger(LoggerMiddleware.name);

    use(req: Request, res: Response, next: Function) {
        const { method, originalUrl, body, params } = req;
        this.logger.log(`[${method}] ${originalUrl} - Params: ${JSON.stringify(params)} - Body: ${JSON.stringify(body)}`);
        next();
    }
}

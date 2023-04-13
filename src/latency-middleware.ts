import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LatencyMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LatencyMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      this.logger.log(`Request to ${req.originalUrl} took ${duration}ms`);
    });
    next();
  }
}

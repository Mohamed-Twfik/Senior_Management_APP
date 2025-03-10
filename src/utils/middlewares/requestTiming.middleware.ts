import {
  Request,
  Response,
  NextFunction
} from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
let PAGE_SIZE = 10;
/**
 * A middleware that sets the `startTime` property on the request object. 
 * It records the current timestamp when the request is received, allowing the duration of the request to be calculated later in logging or response handling.
 * This helps in tracking performance by measuring the time taken to process a request.
 */
@Injectable()
export class RequestTimingMiddleware implements NestMiddleware {
  use(req: Request & {startTime: number}, res: Response, next: NextFunction) {
    req.startTime = Date.now();
    console.log("Page Size: " + PAGE_SIZE);
    if (req.query.pageSize) {
      PAGE_SIZE = parseInt(`${req.query.pageSize}`, 10);
    }
    req.query.pageSize = `${PAGE_SIZE}`;
    next();
  }
}

import { Request, Response, NextFunction } from 'express';
import { detailedLogger } from "../config/logger";

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
    const { method, url } = req;
    const startTime = Date.now();

    res.on('finish', () => {
        const { statusCode } = res;
        const duration = Date.now() - startTime;
        detailedLogger.info({
            method,
            url,
            statusCode,
            duration: `${duration}ms`
        });
    });

    next();
};

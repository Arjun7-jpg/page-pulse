import type { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { AppError } from './errorHandler.js';

export const validateAuditRequest = [
  body('url').isURL({ require_protocol: true }).withMessage('A valid absolute URL is required.'),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(new AppError(400, 'Invalid request body', errors.array()));
      return;
    }

    next();
  },
];

import type { NextFunction, Request, Response } from 'express';

export class AppError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(statusCode: number, message: string, details?: unknown) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      details: error.details,
    });
  }

  const maybeParseError = error as { type?: string; status?: number; body?: unknown } | undefined;
  if (maybeParseError?.type === 'entity.parse.failed' || error instanceof SyntaxError) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON payload',
    });
  }

  console.error('Unhandled error:', error);

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
};

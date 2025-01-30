import httpStatus from 'http-status';
import logger from '../config/logger';
import { NextFunction, Request, Response } from 'express';
import config from '../config/config';
import AppError from '../utils/AppError';

const errorHandler = (err: Error | AppError, _req: Request, res: Response, _next: NextFunction) => {
  let { statusCode, message } = err as AppError;
  if (config.NODE_ENV === 'production' && !(err instanceof AppError && err.isOperational)) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  };

  if (config.NODE_ENV === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

export default errorHandler;

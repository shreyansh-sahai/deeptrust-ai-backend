import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainException, EntityNotFoundException, EntityAlreadyExistsException } from '../../domain/exceptions/domain.exception';
import { BusinessException } from '../../common/exceptions/business.exception';


interface ErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  error: string;
  details?: any;
}


@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResponse = this.buildErrorResponse(exception, request);


    this.logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
    );

    response.status(errorResponse.statusCode).json(errorResponse);
  }


  private buildErrorResponse(
    exception: unknown,
    request: Request,
  ): ErrorResponse {
    const timestamp = new Date().toISOString();
    const path = request.url;


    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      return {
        statusCode: status,
        timestamp,
        path,
        message: typeof exceptionResponse === 'string' 
          ? exceptionResponse 
          : (exceptionResponse as any).message || exception.message,
        error: exception.name,
        details: typeof exceptionResponse === 'object' ? exceptionResponse : undefined,
      };
    }


    if (exception instanceof EntityNotFoundException) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        timestamp,
        path,
        message: exception.message,
        error: 'EntityNotFoundException',
      };
    }

    if (exception instanceof EntityAlreadyExistsException) {
      return {
        statusCode: HttpStatus.CONFLICT,
        timestamp,
        path,
        message: exception.message,
        error: 'EntityAlreadyExistsException',
      };
    }

    if (exception instanceof DomainException) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        timestamp,
        path,
        message: exception.message,
        error: 'DomainException',
      };
    }


    if (exception instanceof BusinessException) {
      return {
        statusCode: exception.statusCode,
        timestamp,
        path,
        message: exception.message,
        error: exception.name,
      };
    }


    if (exception instanceof Error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        timestamp,
        path,
        message: exception.message,
        error: exception.name,
      };
    }


    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp,
      path,
      message: 'Internal server error',
      error: 'InternalServerError',
      details: String(exception),
    };
  }
}

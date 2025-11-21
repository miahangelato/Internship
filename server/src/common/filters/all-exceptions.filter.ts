import { Catch, ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { ApiResponse } from '../api-response';

const ERROR_MAP: Record<number, { code: string; message: string }> = {
  400: { code: 'VALIDATION_ERROR', message: 'Validation error' },
  401: { code: 'AUTH_INVALID_CREDENTIALS', message: 'Invalid credentials' },
  402: { code: 'PAYMENT_FAILED', message: 'Payment failed' },
  403: { code: 'AUTH_INSUFFICIENT_PERMISSIONS', message: 'Insufficient permissions' },
  404: { code: 'RESOURCE_NOT_FOUND', message: 'Resource not found' },
  409: { code: 'DUPLICATE_RESOURCE', message: 'Duplicate resource' },
  410: { code: 'SESSION_EXPIRED', message: 'Session expired' },
  429: { code: 'RATE_LIMIT_EXCEEDED', message: 'Rate limit exceeded' },
  500: { code: 'INTERNAL_SERVER_ERROR', message: 'Internal server error' },
  503: { code: 'SERVICE_UNAVAILABLE', message: 'Service unavailable' },
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    let status = 500;
    let code = 'INTERNAL_SERVER_ERROR';
    let message = 'Internal server error';
    let details = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const body: any = exception.getResponse();
      code = body.code || ERROR_MAP[status]?.code || code;
      message = body.message || ERROR_MAP[status]?.message || message;
      details = body.details || null;
    } else {
      code = ERROR_MAP[status].code;
      message = ERROR_MAP[status].message;
    }

    if (status === 404) {
      code = ERROR_MAP[404].code;
      message = ERROR_MAP[404].message;
    }

    return res.status(status).json(ApiResponse.error(code, message, details));
  }
}

import { randomUUID } from 'crypto';

export class ApiResponse {
  static success(data: any) {
    return {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        request_id: randomUUID(),
      },
    };
  }

  static error(code: string, message: string, details: any = null) {
    return {
      success: false,
      error: {
        code,
        message,
        details,
      },
      meta: {
        timestamp: new Date().toISOString(),
        request_id: randomUUID(),
      },
    };
  }
}

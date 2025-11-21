import 'express';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

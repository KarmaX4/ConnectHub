import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: any;
      } & JwtPayload;
    }
  }
}

export {};

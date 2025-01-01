import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
  } & jwt.JwtPayload;
}

export const auth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }
    console.log("token =",token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded as { userId: string } & jwt.JwtPayload;
    console.log("req.user =",req.user);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};
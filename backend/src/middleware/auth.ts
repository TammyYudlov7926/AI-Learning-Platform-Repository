import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    logger.warn('Missing or invalid Authorization header');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
     (req as any).user = payload;
    logger.debug(`User authenticated: ${JSON.stringify(payload)}`);
    next();
  } catch (err) {
    logger.warn(`Invalid token: ${err}`);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};


export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ( (req as any).user?.role !== 'ADMIN') {
    logger.warn(`User ${ (req as any).user?.userId} attempted to access admin route`);
    return res.status(403).json({ error: 'Admin access required' });
  }
    logger.info(`Authorized admin`);

  next();
};


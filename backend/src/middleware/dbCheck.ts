import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import logger from '../utils/logger';

export function checkUserExists(paramName: string = 'id') {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params[paramName]);
    if (isNaN(userId)) {
      logger.warn(`DB check failed - invalid ID param: ${req.params[paramName]}`);
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      logger.warn(`User with ID ${userId} not found in DB`);
      return res.status(404).json({ error: `User with ID ${userId} not found` });
    }

    next();
  };
}

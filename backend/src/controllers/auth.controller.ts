
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); import logger from '../utils/logger';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phone, password } = req.body;
    const user = await prisma.user.findUnique({ where: { phone } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      logger.warn(`Failed login attempt for phone ${phone}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
   console.log('JWT_SECRET FROM ENV:', process.env.JWT_SECRET);

    logger.info(`User ${user.id} logged in`);
    res.json({ token, role: user.role });
  } catch (err) {
    logger.error(`Login error for phone ${req.body.phone}: ${err}`);
    next(err);
  }
};

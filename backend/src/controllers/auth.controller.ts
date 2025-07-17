import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';
import { asyncHandler } from '../utils/asyncHandler';

const prisma = new PrismaClient();

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { phone, password } = req.body;
  const user = await prisma.user.findUnique({ where: { phone } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    logger.warn(`Failed login attempt for phone ${phone}`);
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  logger.info(`User ${user.id} logged in`);
  res.json({ token, role: user.role });
});

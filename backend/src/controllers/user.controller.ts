
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { asyncHandler } from '../utils/asyncHandler';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';
// import { AppError } from '../utils/asyncHandler';
const prisma = new PrismaClient();

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, phone, password } = req.body;

  if (!name || !phone || !password) {
    res.status(400);
    throw new Error('Name, phone, and password are required');
  }

  const existing = await prisma.user.findUnique({ where: { phone } });
  if (existing) {
    res.status(409);
    throw new Error('Phone already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: { name, phone, password: hashedPassword, role: 'USER' },
  });
  logger.info(`New user registered: ${newUser.id}`);

  res.status(201).json({
    id: newUser.id,
    name: newUser.name,
    phone: newUser.phone,
    role: newUser.role,
  });
});

import { Request, Response, NextFunction } from 'express';
import * as adminService from '../services/admin.service';
import logger from '../utils/logger';
import { PrismaClient } from '@prisma/client';
import { asyncHandler } from '../utils/asyncHandler';

const prisma = new PrismaClient();

export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || '';
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { phone: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({ where, skip, take: limit, orderBy: { id: 'asc' } }),
      prisma.user.count({ where }),
    ]);

    res.json({
      users,
      page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    next(error);
  }
};

export const listUserPrompts = asyncHandler(async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const prompts = await adminService.listUserPrompts(userId);
  logger.info(`Admin fetched prompts for user ${userId}`);
  res.json(prompts);
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const user = await adminService.updateUser(userId, req.body);
  logger.info(`Admin updated user ${userId}`);
  res.json(user);
});


export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  await adminService.deleteUser(userId);
  logger.info(`Admin deleted user ${userId}`);
  res.status(204).send();
});


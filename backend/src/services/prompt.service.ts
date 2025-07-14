import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPrompt = async (
  userId: number,
  categoryId: number,
  subCategoryId: number,
  prompt: string,
  response: string
) => {
  return await prisma.prompt.create({
    data: {
      userId,
      categoryId,
      subCategoryId,
      prompt,
      response,
    },
  });
};

export const getUserPrompts = async (userId: number) => {
  return await prisma.prompt.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
      subCategory: true,
    },
  });
};

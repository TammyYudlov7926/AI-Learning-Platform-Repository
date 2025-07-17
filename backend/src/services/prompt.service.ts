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

export const getUserPromptsByPhone = async (phone: string) => {
  const user = await prisma.user.findUnique({
    where: { phone },
    select: { id: true },
  });

  if (!user) return [];

  return await prisma.prompt.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
      subCategory: true,
    },
  });
};

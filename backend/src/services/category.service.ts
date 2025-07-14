import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCategories = async () => {
  return await prisma.category.findMany({
    include: { subCategories: true },
  });
};

export const getCategoryById = async (id: number) => {
  return await prisma.category.findUnique({
    where: { id },
    include: { subCategories: true },
  });
};

export const createCategory = async (name: string) => {
  return await prisma.category.create({
    data: { name },
  });
};

export const updateCategory = async (id: number, name: string) => {
  return await prisma.category.update({
    where: { id },
    data: { name },
  });
};

export const deleteCategory = async (id: number) => {
  return await prisma.category.delete({
    where: { id },
  });
};

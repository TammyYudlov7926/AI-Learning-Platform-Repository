import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSubCategories = async () => {
  return await prisma.subCategory.findMany({
    include: { category: true },
  });
};

export const getSubCategoryById = async (id: number) => {
  return await prisma.subCategory.findUnique({
    where: { id },
    include: { category: true },
  });
};

export const createSubCategory = async (name: string, categoryId: number) => {
  return await prisma.subCategory.create({
    data: {
      name,
      categoryId,
    },
  });
};

export const updateSubCategory = async (id: number, name: string, categoryId: number) => {
  return await prisma.subCategory.update({
    where: { id },
    data: {
      name,
      categoryId,
    },
  });
};

export const deleteSubCategory = async (id: number) => {
  return await prisma.subCategory.delete({
    where: { id },
  });
};

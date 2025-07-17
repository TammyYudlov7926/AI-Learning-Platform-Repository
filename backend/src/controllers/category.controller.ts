// בקובץ למשל: category.controller.ts

import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as categoryService from '../services/category.service';

export const getCategories = asyncHandler(async (_req: Request, res: Response) => {
  const categories = await categoryService.getCategories();
  res.json(categories);
});

export const getCategory = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const category = await categoryService.getCategoryById(id);
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  res.json(category);
});

export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error('Name is required');
  }
  const newCategory = await categoryService.createCategory(name);
  res.status(201).json(newCategory);
});

export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error('Name is required');
  }
  const updatedCategory = await categoryService.updateCategory(id, name);
  res.json(updatedCategory);
});

export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await categoryService.deleteCategory(id);
  res.status(204).send();
});

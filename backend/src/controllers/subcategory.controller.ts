import { Request, Response } from 'express';
import * as subCategoryService from '../services/subcategory.service';

export const getSubCategories = async (req: Request, res: Response) => {
  try {
    const subCategories = await subCategoryService.getSubCategories();
    res.json(subCategories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subcategories' });
  }
};

export const getSubCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const subCategory = await subCategoryService.getSubCategoryById(id);
    if (!subCategory) return res.status(404).json({ message: 'SubCategory not found' });
    res.json(subCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subcategory' });
  }
};

export const createSubCategory = async (req: Request, res: Response) => {
  try {
    const { name, categoryId } = req.body;
    if (!name || !categoryId) return res.status(400).json({ message: 'Name and categoryId are required' });
    const newSubCategory = await subCategoryService.createSubCategory(name, categoryId);
    res.status(201).json(newSubCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating subcategory' });
  }
};

export const updateSubCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, categoryId } = req.body;
    if (!name || !categoryId) return res.status(400).json({ message: 'Name and categoryId are required' });
    const updatedSubCategory = await subCategoryService.updateSubCategory(id, name, categoryId);
    res.json(updatedSubCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating subcategory' });
  }
};

export const deleteSubCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await subCategoryService.deleteSubCategory(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subcategory' });
  }
};

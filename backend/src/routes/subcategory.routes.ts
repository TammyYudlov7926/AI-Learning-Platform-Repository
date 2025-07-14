import express from 'express';
import * as subCategoryController from '../controllers/subcategory.controller';

const router = express.Router();

router.get('/', subCategoryController.getSubCategories);
router.get('/:id', subCategoryController.getSubCategory);
router.post('/', subCategoryController.createSubCategory);
router.put('/:id', subCategoryController.updateSubCategory);
router.delete('/:id', subCategoryController.deleteSubCategory);

export default router;

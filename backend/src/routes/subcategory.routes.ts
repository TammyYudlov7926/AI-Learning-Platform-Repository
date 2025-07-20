import express from 'express';
import * as subCategoryController from '../controllers/subcategory.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: SubCategories
 *   description: SubCategories management
 */

/**
 * @swagger
 * /api/subcategories:
 *   get:
 *     summary: Get all subcategories
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   categoryId:
 *                     type: integer
 */
router.get('/', subCategoryController.getSubCategories);

/**
 * @swagger
 * /api/subcategories/{id}:
 *   get:
 *     summary: Get subcategory by ID
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Subcategory details
 *       404:
 *         description: Subcategory not found
 */
router.get('/:id', subCategoryController.getSubCategory);

/**
 * @swagger
 * /api/subcategories:
 *   post:
 *     summary: Create a new subcategory
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Subcategory created successfully
 */
router.post('/', subCategoryController.createSubCategory);

/**
 * @swagger
 * /api/subcategories/{id}:
 *   put:
 *     summary: Update subcategory
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Subcategory updated successfully
 */
router.put('/:id', subCategoryController.updateSubCategory);

/**
 * @swagger
 * /api/subcategories/{id}:
 *   delete:
 *     summary: Delete subcategory
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Subcategory deleted successfully
 */
router.delete('/:id', subCategoryController.deleteSubCategory);

export default router;

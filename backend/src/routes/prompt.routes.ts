import express from 'express';
import { createPrompt, getUserPromptsByPhone } from '../controllers/prompt.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Prompts
 *   description: AI Prompts management
 */

/**
 * @swagger
 * /api/prompts:
 *   post:
 *     summary: Create a new AI prompt
 *     tags: [Prompts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryId
 *               - subCategoryId
 *               - prompt
 *             properties:
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               subCategoryId:
 *                 type: integer
 *                 example: 4
 *               prompt:
 *                 type: string
 *                 example: "Explain what is a black hole"
 *     responses:
 *       200:
 *         description: AI response generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "A black hole is a region of spacetime..."
 *       401:
 *         description: Unauthorized - Invalid token
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticate, createPrompt);

/**
 * @swagger
 * /api/prompts/user/{phone}:
 *   get:
 *     summary: Get user prompts by phone number
 *     tags: [Prompts]
 *     parameters:
 *       - in: path
 *         name: phone
 *         required: true
 *         schema:
 *           type: string
 *         example: "0501234567"
 *     responses:
 *       200:
 *         description: List of user prompts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   prompt:
 *                     type: string
 *                   response:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   category:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                   subCategory:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *       404:
 *         description: User not found
 */
router.get('/by-phone/:phone', getUserPromptsByPhone);
router.get('/user/:phone', getUserPromptsByPhone);

export default router;




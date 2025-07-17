import express from 'express';
import {
  listUsers,
  listUserPrompts,
  updateUser,
  deleteUser,
} from '../controllers/admin.controller';
import { validateIdParam } from '../middleware/validate';
import { checkUserExists } from '../middleware/dbCheck';
import { authenticate, authorizeAdmin } from '../middleware/auth';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin endpoints for managing users and prompts
 */

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get paginated list of users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of users
 */

/**
 * @swagger
 * /api/admin/users/{id}/prompts:
 *   get:
 *     summary: Get prompts history for a specific user
 *     tags: [Admin]
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
 *         description: List of prompts for user
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/admin/users/{id}:
 *   patch:
 *     summary: Update user details (e.g. role)
 *     tags: [Admin]
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
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Admin]
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
 *         description: User deleted
 *       404:
 *         description: User not found
 */

router.get('/users', authenticate, authorizeAdmin, listUsers);

router.get(
  '/users/:id/prompts',
  authenticate,
  authorizeAdmin,
  validateIdParam(),
  checkUserExists(),
  listUserPrompts
);

router.patch(
  '/users/:id',
  authenticate,
  authorizeAdmin,
  validateIdParam(),
  checkUserExists(),
  updateUser
);

router.delete(
  '/users/:id',
  authenticate,
  authorizeAdmin,
  validateIdParam(),
  checkUserExists(),
  deleteUser
);

export default router;

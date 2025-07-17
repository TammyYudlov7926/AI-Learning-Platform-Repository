import express from 'express';
import { login } from '../controllers/auth.controller';

const router = express.Router();



/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and Registration

 * /api/auth/login:
 *   post:
 *     summary: Login user and receive JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - password
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "0501234567"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Successful login, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 role:
 *                   type: string
 *                   enum: [USER, ADMIN]
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

router.post('/login', login);

export default router;

import express from 'express';
import { createPrompt, getUserPrompts } from '../controllers/prompt.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticate, createPrompt);
router.get('/user/:userId', authenticate, getUserPrompts);
router.get('/user/:userId', authenticate, getUserPrompts);

export default router;




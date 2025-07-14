import express from 'express';
import { createPrompt, getUserPrompts } from '../controllers/prompt.controller';

const router = express.Router();

router.post('/', createPrompt);
router.get('/user/:userId', getUserPrompts);

export default router;

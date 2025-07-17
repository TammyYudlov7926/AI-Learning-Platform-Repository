import express from 'express';
import { createPrompt, getUserPromptsByPhone } from '../controllers/prompt.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticate, createPrompt);

router.get('/by-phone/:phone', getUserPromptsByPhone);
router.get('/user/:phone', getUserPromptsByPhone); 

export default router;




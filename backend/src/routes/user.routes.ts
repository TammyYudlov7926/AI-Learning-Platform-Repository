import express from 'express';
import { registerUser } from '../controllers/user.controller';

const router = express.Router();

router.post('/', registerUser);

export default router;


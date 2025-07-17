import { Request, Response } from 'express';
import * as promptService from '../services/prompt.service';
import { getAIResponse } from '../services/openai.service';
import { asyncHandler } from '../utils/asyncHandler';

export const createPrompt = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;
  const { categoryId, subCategoryId, prompt } = req.body;

  if (!userId || !categoryId || !subCategoryId || !prompt) {
    throw new Error('All fields are required');
  }

  const aiResponse = await getAIResponse(prompt);

  const newPrompt = await promptService.createPrompt(
    userId,
    categoryId,
    subCategoryId,
    prompt,
    aiResponse
  );

  res.status(201).json(newPrompt);
});

export const getUserPromptsByPhone = asyncHandler(async (req: Request, res: Response) => {
  const phone = req.params.phone;
  if (!phone) throw new Error('Phone number is required');

  const prompts = await promptService.getUserPromptsByPhone(phone);
  res.json(prompts);
});





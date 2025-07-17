import { Request, Response } from 'express';
import * as promptService from '../services/prompt.service';
import { getAIResponse } from '../services/openai.service';

export const createPrompt = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    const { categoryId, subCategoryId, prompt } = req.body;

    if (!userId || !categoryId || !subCategoryId || !prompt) {
      return res.status(400).json({ message: 'All fields are required' });
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
  } catch (error) {
    console.error('Error creating prompt:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({ message: errorMessage });
  }
};

export const getUserPromptsByPhone = async (req: Request, res: Response) => {
  try {
    const phone = req.params.phone;
    if (!phone) return res.status(400).json({ message: 'Phone number is required' });

    const prompts = await promptService.getUserPromptsByPhone(phone);
    res.json(prompts);
  } catch (error) {
    console.error('Error fetching prompts by phone:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({ message: errorMessage });
  }
};







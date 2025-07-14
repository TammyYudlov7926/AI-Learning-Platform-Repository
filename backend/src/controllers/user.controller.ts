import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone are required' });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        phone,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
  console.error('Error creating user:', error);
  const errorMessage = (error instanceof Error) ? error.message : 'Internal server error';
  res.status(500).json({ message: errorMessage });
}

  
};


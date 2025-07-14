import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAIResponse = async (prompt: string): Promise<string> => {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-4", // או "gpt-3.5-turbo"
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 500,
  });

  return chatCompletion.choices[0].message?.content || "לא התקבלה תגובה מה-AI";
};

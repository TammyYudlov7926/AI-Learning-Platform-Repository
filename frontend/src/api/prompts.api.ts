import api from './index';

export const promptsAPI = {
  createPrompt: async (categoryId: number, subCategoryId: number, prompt: string) => {
    const response = await api.post('/prompts', { categoryId, subCategoryId, prompt });
    return response.data;
  },

  getUserPrompts: async (userId: string) => {
    const response = await api.get(`/prompts/user/${userId}`);
    return response.data;
  },
};
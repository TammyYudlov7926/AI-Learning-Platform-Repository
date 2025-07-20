import api from './index';

export const categoriesAPI = {
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  getSubCategories: async () => {
    const response = await api.get('/subcategories');
    return response.data;
  },
};
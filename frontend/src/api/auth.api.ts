import api from './index';

export const authAPI = {
  login: async (phone: string, password: string) => {
    const response = await api.post('/auth/login', { phone, password });
    return response.data;
  },

  register: async (name: string, phone: string, password: string) => {
    const response = await api.post('/users/register', { name, phone, password });
    return response.data;
  },
};
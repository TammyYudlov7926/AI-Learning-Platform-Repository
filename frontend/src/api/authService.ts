import axios from 'axios';

const API_URL = 'http://localhost:8000/api';
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


export const registerUser = async (name: string, phone: string, password: string) => {
  const response = await axios.post(`${API_URL}/users/register`, {
    name,
    phone,
    password,
  });
  return response.data;
};


export const loginUser = async (phone: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { phone, password });
  return response.data;
};



export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`, getAuthHeaders());
  return response.data;
};

export const getSubCategories = async () => {
  const response = await axios.get(`${API_URL}/subcategories`, getAuthHeaders());
  return response.data;
};

export const getSubCategoryById = async (id: number) => {
  const response = await axios.get(`${API_URL}/subcategories/${id}`, getAuthHeaders());
  return response.data;
};

export const createPrompt = async (
  categoryId: number,
  subCategoryId: number,
  prompt: string
) => {
  const response = await axios.post(
    `${API_URL}/prompts`,
    { categoryId, subCategoryId, prompt },
    getAuthHeaders()
  );
  return response.data;
};

export const getUserPrompts = async (userId: string) => {
  const response = await axios.get(`${API_URL}/prompts/user/${userId}`, getAuthHeaders());
  return response.data;
};

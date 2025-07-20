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





export const getSubCategories = async () => {
  const response = await axios.get(`${API_URL}/subcategories`, getAuthHeaders());
  return response.data;
};

export const getSubCategoryById = async (id: number) => {
  const response = await axios.get(`${API_URL}/subcategories/${id}`, getAuthHeaders());
  return response.data;
};


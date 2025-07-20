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

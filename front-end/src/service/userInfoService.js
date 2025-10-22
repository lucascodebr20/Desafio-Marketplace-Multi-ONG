import axios from 'axios';
import {API_URL} from '../config/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

export const getUserData = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    throw error;
  }
};
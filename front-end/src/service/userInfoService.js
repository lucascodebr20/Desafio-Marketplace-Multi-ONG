import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:8080',
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
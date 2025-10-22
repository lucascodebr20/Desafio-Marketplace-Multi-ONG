import axios from 'axios';
import { API_URL } from '../config/api';

export const fetchAllCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/category`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Ocorreu um erro ao buscar as categorias:", error);
        throw error;
    }
};
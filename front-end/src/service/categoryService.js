import axios from 'axios';

export const fetchAllCategories = async () => {
    try {
        const response = await axios.get('http://localhost:8080/category', { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Ocorreu um erro ao buscar as categorias:", error);
        throw error;
    }
};
import axios from 'axios';

export const fetchAllCategories = async () => {
    const url = `http://localhost:8080/category`;

    try {
        const response = await axios.get(url, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Ocorreu um erro ao buscar as categorias:", error);
        throw error;
    }
};
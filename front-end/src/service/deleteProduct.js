import axios from "axios";
import { API_URL } from "../config/api";

export const deleteProduct = async (idProduct) => {
    try {
        const response = await axios.delete(`${API_URL}/dashboard-product/${idProduct}` , {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao deletar o produto:", error);
        throw error;
    }
};
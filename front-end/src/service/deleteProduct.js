import axios from "axios";

export const deleteProduct = async (idProduct) => {
    try {
        const response = await axios.delete(`https://api.lucasbuild.xyz/dashboard-product/${idProduct}` , {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao deletar o produto:", error);
        throw error;
    }
};
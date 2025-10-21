import axios from 'axios';

const API_BASE_URL = 'https://api.lucasbuild.xyz/product/all'; 


export const fetchProducts = async (queryString) => {
    const url = `${API_BASE_URL}?${queryString}`;
    console.log("🔍 URL final:", url);
    const response = await axios.get(url);
    return response.data; 
};
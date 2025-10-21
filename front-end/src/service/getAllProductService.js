import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/product/all'; // 👈 singular!


export const fetchProducts = async (queryString) => {
    const url = `${API_BASE_URL}?${queryString}`;
    console.log("🔍 URL final:", url);
    const response = await axios.get(url);
    return response.data; 
};
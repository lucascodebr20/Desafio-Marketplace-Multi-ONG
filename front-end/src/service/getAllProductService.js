import axios from 'axios';
import {API_URL} from '../config/api';

export const fetchProducts = async (queryString) => {
    const url = `${API_URL}?${queryString}`;
    console.log("🔍 URL final:", url);
    const response = await axios.get(url);
    return response.data; 
};
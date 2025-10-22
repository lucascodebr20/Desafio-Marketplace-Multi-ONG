import axios from 'axios';
import { API_URL } from '../config/api';

export const fetchImageAsBlobUrl = async (imageName) => {
    
    if (!imageName) {
        return 'https://via.placeholder.com/150';
    }

    const url = `${API_URL}/images/${imageName}`;

    try {
        const response = await axios.get(url, { responseType: 'blob' });
        const blobUrl = URL.createObjectURL(response.data);
        return blobUrl;
    } catch (error) {
        return 'https://via.placeholder.com/150?text=Error';
    }
};
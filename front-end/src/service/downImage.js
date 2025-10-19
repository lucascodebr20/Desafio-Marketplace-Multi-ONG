import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const fetchImageAsBlobUrl = async (imageName) => {
    
    if (!imageName) {
        return 'https://via.placeholder.com/150';
    }

    const url = `${API_BASE_URL}/images/${imageName}`;

    try {
        const response = await axios.get(url, { responseType: 'blob' });
        const blobUrl = URL.createObjectURL(response.data);
        return blobUrl;
    } catch (error) {
        return 'https://via.placeholder.com/150?text=Error';
    }
};
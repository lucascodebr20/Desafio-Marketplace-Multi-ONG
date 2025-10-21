import axios from 'axios';

const API_BASE_URL = 'https://api.lucasbuild.xyz';

export const getProductFormData = async (productId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/dashboard-product/${productId}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados do produto:', error);
        throw error;
    }
};

export const updateProduct = async (productId, formData, uploadMethod, imageFile, imageUrl) => {
    const url = `${API_BASE_URL}/dashboard-product/update`;

    const dataToSubmit = new FormData();

    dataToSubmit.append('productId', productId);
    Object.entries(formData).forEach(([key, value]) => {
        dataToSubmit.append(key, value);
    });

    if (uploadMethod === 'upload' && imageFile) {
        dataToSubmit.append('imageFile', imageFile, 'product-image.webp');
    } else if (uploadMethod === 'url') {
        dataToSubmit.append('imageUrl', imageUrl);
    }

    return axios.put(url, dataToSubmit, {
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export const fetchAllCategories = async () => {
    try {
        const response = await apiClient.get('/category');
        return response.data;
    } catch (error) {
        console.error("Ocorreu um erro ao buscar as categorias:", error);
        throw error; 
    }
};

export const getProductById = async (productId) => {
    try {
        const response = await apiClient.get(`/product/${productId}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar dados do produto ${productId}:`, error);
        throw error;
    }
};


export const updateProduct = async (productData, uploadMethod, imageFile, imageUrl) => {
    const url = '/dashboard-product/update';
    
    if (uploadMethod === 'upload') {
        const formData = new FormData();
        Object.entries(productData).forEach(([key, value]) => {
            if (key === 'categoryIds' && Array.isArray(value)) {
                value.forEach(id => formData.append('categoryIds', id));
            } else {
                formData.append(key, value);
            }
        });
        if (imageFile) {
            formData.append('imageFile', imageFile);
        }
        return apiClient.put(url, formData);
    }
    
    if (uploadMethod === 'url') {
        const payload = { ...productData, imageUrl };
        return apiClient.put(url, payload, {
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

export const fetchImageAsBlobUrl = async (imageName) => {
    if (!imageName) return null;
    try {
        const response = await apiClient.get(`/images/${imageName}`, { responseType: 'blob' });
        return URL.createObjectURL(response.data);
    } catch (error) {
        console.error('Erro ao buscar imagem:', error);
        return null;
    }
};

export const getUpdatePageData = async (productId) => {

    const [product, categories] = await Promise.all([
        getProductById(productId),
        fetchAllCategories()
    ]);

    let imagePreview = null;
    if (product.imageName) {
        imagePreview = await fetchImageAsBlobUrl(product.imageName);
    }

    return { product, categories, imagePreview };
};
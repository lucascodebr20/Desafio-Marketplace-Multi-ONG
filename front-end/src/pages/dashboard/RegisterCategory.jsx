import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config/api.js';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import ListCategory from '../../components/category/ListCategory.jsx'; // Ajuste o caminho se necessário

function RegisterCategory() {

    const [nameCategory, setNameCategory] = useState('');
    const [loadingForm, setLoadingForm] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loadingList, setLoadingList] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoadingList(true);
            try {
                const response = await axios.get(`${API_URL}/category`, { withCredentials: true });
                setCategories(response.data);
            } catch (err) {
                toast.error("Não foi possível carregar as categorias.");
            } finally {
                setLoadingList(false);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!nameCategory.trim()) {
            toast.error('Por favor, preencha o nome da categoria.');
            return;
        }

        setLoadingForm(true);
        const url = `${API_URL}/dashboard-admin/register-category`;
        const requestBody = { nameCategory };

        try {

            const response = await axios.post(url, requestBody, { withCredentials: true });
            toast.success('Categoria cadastrada com sucesso!');
            setNameCategory('');
            setCategories(prevCategories => [...prevCategories, response.data]);
            
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Falha ao cadastrar a categoria.';
            toast.error(errorMessage);
        } finally {
            setLoadingForm(false);
        }
    };

    const handleCategoryDeleted = (deletedCategoryId) => {
        setCategories(prevCategories => 
            prevCategories.filter(cat => cat.categoryId !== deletedCategoryId)
        );
    };

    const inputStyle = "w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600";
    const labelStyle = "block text-sm font-semibold text-gray-800 mb-1.5";

    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Gerenciar Categorias</h1>
            
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg flex flex-row items-end gap-4 mb-8">
                <div className="flex-grow">
                    <label htmlFor="nameCategory" className={labelStyle}>
                        Nome da Categoria <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="nameCategory"
                        id="nameCategory"
                        value={nameCategory}
                        onChange={(e) => setNameCategory(e.target.value)}
                        required
                        className={inputStyle}
                        placeholder="Ex: Brinquedos"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loadingForm}
                    className="h-10 inline-flex items-center justify-center px-8 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
                >
                    {loadingForm ? 'Cadastrando...' : 'Cadastrar'}
                </button>
            </form>

            <ListCategory 
                categories={categories} 
                loading={loadingList}
                onCategoryDeleted={handleCategoryDeleted} 
            />
        </div>
    );
}

export default RegisterCategory;
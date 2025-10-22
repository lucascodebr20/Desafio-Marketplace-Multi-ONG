import React from 'react';
import axios from 'axios';
import { API_URL } from '../../config/api';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

function ListCategory({ categories, loading, onCategoryDeleted }) {
    
    const handleDelete = async (categoryId) => {
        if (!window.confirm("Você tem certeza que deseja deletar esta categoria? Esta ação não pode ser desfeita.")) {
            return; }
        try {
            await axios.delete(`${API_URL}/dashboard-admin/${categoryId}`, { withCredentials: true });
            toast.success('Categoria deletada com sucesso!');
            onCategoryDeleted(categoryId);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Falha ao deletar a categoria.');
        }
    };

    if (loading) {
        return <p className="text-center mt-10">Carregando categorias...</p>;
    }

    return (
        <div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                {categories.length > 0 ? (
                    <ul className="space-y-4">
                        {categories.map(category => (
                            <li
                                key={category.categoryId}
                                className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 rounded-md"
                            >
                                <span className="text-gray-800 font-medium">{category.nameCategory}</span>
                                <button
                                    onClick={() => handleDelete(category.categoryId)}
                                    className="text-gray-500 hover:text-red-600 transition-colors p-2 rounded-md hover:bg-red-100"
                                    aria-label={`Deletar categoria ${category.nameCategory}`}
                                >
                                    <FaTrash />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">Nenhuma categoria cadastrada ainda.</p>
                )}
            </div>
        </div>
    );
}

export default ListCategory;
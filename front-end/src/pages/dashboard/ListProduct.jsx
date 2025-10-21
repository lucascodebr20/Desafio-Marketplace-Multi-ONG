import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { deleteProduct } from '../../service/deleteProduct';
import axios from 'axios';
import Product from '../../components/product/Product'; 

function ProductCardSkeleton() {
    return (
        <div className="bg-white shadow-lg rounded-lg flex p-4 mb-4 animate-pulse">
            <div className="w-28 h-28 bg-gray-300 rounded-md mr-6"></div>
            <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4 mt-2"></div>
            </div>
            <div className="flex flex-col justify-center space-y-3 ml-6">
                <div className="h-8 w-28 bg-gray-300 rounded"></div>
                <div className="h-8 w-28 bg-gray-300 rounded"></div>
            </div>
        </div>
    );
}

function ListProduct() {
    const navigate = useNavigate();
    const [pageData, setPageData] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:8080/dashboard-product/list`, {
                    withCredentials: true,
                    params: {
                        page: currentPage,
                        size: 5
                    }
                });
                setPageData(response.data);
            } catch (err) {
                console.error("Erro ao buscar produtos:", err);
                setError("Erro ao carregar produtos. Por favor, tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage]);

    const handleNextPage = () => {
        if (!pageData || pageData.last) return;
        setCurrentPage(prev => prev + 1);
    };

    const handlePreviousPage = () => {
        if (!pageData || pageData.first) return;
        setCurrentPage(prev => prev - 1);
    };

    const handleEdit = (productId) => {
        navigate(`/dashboard/update-product/${productId}`);
    };

    const handleDelete = async (productId) => {
        if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;

        try {
            await deleteProduct(productId);
            toast.success('Produto excluído com sucesso!');
            setPageData(prevData => ({
                ...prevData,
                content: prevData.content.filter(p => p.productId !== productId)
            }));

        } catch {
            toast.error('Erro ao excluir produto.');
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <Toaster position="top-right" reverseOrder={false} />
            <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Meus Produtos</h1>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
            <div className="mt-4">
                {loading && (
                    Array.from({ length: 5 }).map((_, index) => <ProductCardSkeleton key={index} />)
                )}

                {!loading && pageData && (
                    <>
                        {pageData.content && pageData.content.length > 0 ? (
                            pageData.content.map(product => (
                                <Product 
                                    key={product.productId}
                                    product={product}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))
                        ) : (
                            <p className="text-center text-gray-500 mt-8">Nenhum produto encontrado.</p>
                        )}
                    </>
                )}
            </div>

            {!loading && pageData && pageData.totalPages > 1 && (
                <div className="flex justify-between items-center mt-8">
                    <button
                        onClick={handlePreviousPage}
                        disabled={pageData.first}
                        className="bg-gray-700 text-white px-5 py-2 rounded-md hover:bg-gray-600 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed transition-colors"
                    > Anterior
                    </button>
                    <span className="text-gray-700 font-medium">
                        Página {pageData.number + 1} de {pageData.totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={pageData.last}
                        className="bg-gray-700 text-white px-5 py-2 rounded-md hover:bg-gray-600 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed transition-colors"
                    > Próximo
                    </button>
                </div>
            )}
        </div>
    );
}

export default ListProduct;
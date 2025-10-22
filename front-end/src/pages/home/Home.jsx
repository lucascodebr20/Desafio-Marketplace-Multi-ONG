
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ProductCard from '../../components/product/CardProduct';
import FilterHome from '../../components/filter/FilterHome';
import NavBarPublic from '../../components/navbar/NavBarPublic';
import Footer from '../../components/footer/Footer';
import { API_URL } from '../../config/api';

function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [currentFilters, setCurrentFilters] = useState({
        price: { min: '', max: '' },
        categories: [],
    });

    const productsPerPage = 8;

    const loadProductsByFilter = useCallback(async (filters, page) => {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        params.append('page', page);
        params.append('size', productsPerPage);

        if (filters.price?.min) {
            params.append('priceMin', filters.price.min);
        }
        if (filters.price?.max) {
            params.append('priceMax', filters.price.max);
        }
        if (filters.categories && filters.categories.length > 0) {
            filters.categories.forEach(id => params.append('categoryIds', id));
        }

        try {
            const response = await axios.get(`${API_URL}/product/all?${params.toString()}`);
            setProducts(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Não foi possível carregar os produtos.";
            setError(errorMessage);
            setProducts([]);
            setTotalPages(0);
        } finally {
            setLoading(false);
        }ge
    }, [productsPerPage]);

    useEffect(() => {
        loadProductsByFilter(currentFilters, currentPage);
    }, [currentPage, currentFilters, loadProductsByFilter]);


    const handleFilterChange = (newFilters) => {
        setCurrentFilters(prev => ({
            ...prev,
            ...newFilters
        }));
        setCurrentPage(0);
    };
    
    const handleSearch = async (text, isSmart) => {
        setLoading(true);
        setError(null);
        setCurrentPage(0);

        const searchBody = {
            text: text,
            iaSearch: isSmart,
            page: 0, 
            size: productsPerPage
        };

        try {
            const response = await axios.post(`${API_URL}/search`, searchBody);
            setProducts(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Nenhum produto encontrado na busca.";
            setError(errorMessage);
            setProducts([]);
            setTotalPages(0);
        } finally {
            setLoading(false);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };
    
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            
            <NavBarPublic onSearch={handleSearch} />

            <div className="flex-grow">
                <FilterHome onFilterChange={handleFilterChange} />

                <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">O que as ONGs estão vendendo</h1>

                    {loading ? (
                        <p className="text-center text-xl mt-10">Carregando produtos...</p>
                    ) : error ? (
                        <p className="text-center text-xl mt-10 text-red-500">{error}</p>
                    ) : products.length === 0 ? (
                        <p className="text-center text-xl text-gray-600 mt-10">Nenhum produto encontrado.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.map(product => (
                                <ProductCard key={product.productId} product={product} />
                            ))}
                        </div>
                    )}

                    {totalPages > 1 && !loading && (
                        <div className="mt-12 flex justify-center items-center space-x-4">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 0}
                                className="bg-[#8b38d1] text-white font-bold py-2 px-4 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                            > 
                                Anterior
                            </button>

                            <span className="text-gray-700">
                                Página {currentPage + 1} de {totalPages}
                            </span>

                            <button
                                onClick={handleNextPage}
                                disabled={currentPage >= totalPages - 1}
                                className="bg-[#8b38d1] text-white font-bold py-2 px-4 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                            > 
                                Próxima
                            </button>
                        </div>
                    )}
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default HomePage;
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importe o axios diretamente no componente
import ProductCard from '../../components/product/CardProduct'; 
import NavBarPublic from '../../components/navbar/NavBarPublic'
import Footer from '../../components/footer/Footer';

function HomePage() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const productsPerPage = 8; 

    
    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            setError(null);

            try {

                const response = await axios.get(`http://localhost:8080/product/all`, {
                    params: {
                        page: currentPage,
                        size: productsPerPage
                    }
                });
                
                setProducts(response.data.content);
                setTotalPages(response.data.totalPages);

            } catch (err) {
                console.error("Erro ao buscar produtos:", err);
                setError("Não foi possível carregar os produtos. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [currentPage]); 

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

    if (loading) {
        return <p className="text-center text-xl mt-10">Carregando produtos...</p>;
    }

    if (error) {
        return <p className="text-center text-xl mt-10 text-red-500">{error}</p>;
    }

    return (
        
        <div className="bg-gray-50 min-h-screen">
            <NavBarPublic />
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">O que as ONGs estão vendendo</h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCard key={product.productId} product={product} />
                    ))}
                </div>

                <div className="mt-12 flex justify-center items-center space-x-4">
                    <button 
                        onClick={handlePrevPage} 
                        disabled={currentPage === 0}
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Anterior
                    </button>
                    
                    <span className="text-gray-700">
                        Página {currentPage + 1} de {totalPages}
                    </span>

                    <button 
                        onClick={handleNextPage}
                        disabled={currentPage >= totalPages - 1}
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Próxima
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
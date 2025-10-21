import React, { useState, useEffect } from "react";
import CardOrderUser from "../../components/order/CardOrderUser";
import axios from "axios";

function OrderUser() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0); 
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:8080/order`, {
                    withCredentials: true,
                    params: {
                        page: currentPage,
                        size: 3
                    }
                });

                setOrders(response.data.content);
                setTotalPages(response.data.totalPages);

            } catch (err) {
                console.error("Erro ao buscar pedidos:", err);
                setError("Erro ao carregar os pedidos. Por favor, tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading) {
        return <div className="text-center mt-10"><h1>Carregando pedidos... ⏳</h1></div>;
    }
    
    if (error) {
        return <div className="text-center mt-10 text-red-500"><h1>{error}</h1></div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Meus Pedidos</h1>
                
                {orders.length > 0 ? (
                    <>
                        {orders.map(order => (
                            <CardOrderUser key={order.orderId} order={order} />
                        ))}
                        
                        {totalPages > 1 && (
                            <div className="flex justify-between items-center mt-8">
                                <button
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 0}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                                >
                                    ◀️ Anterior
                                </button>
                                <span className="text-gray-700 font-semibold">
                                    Página {currentPage + 1} de {totalPages}
                                </span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage >= totalPages - 1}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                                >
                                    Próxima ▶️
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-center text-gray-500 mt-10">Você ainda não fez nenhum pedido.</p>
                )}
            </div>
        </div>
    );
}

export default OrderUser;
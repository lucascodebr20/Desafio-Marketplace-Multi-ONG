import { useState, useEffect } from "react";
import {API_URL} from "../../config/api";
import axios from "axios";
import CartProduct from "../../components/product/CartProduct";
import NavBarPublic from "../../components/navbar/NavBarPublic";
import Footer from "../../components/footer/Footer";


function Cart() {

    const [detailedCartItems, setDetailedCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartDetails = async () => {
            const storedCart = localStorage.getItem('shoppingCart');
            const itemsFromStorage = storedCart ? JSON.parse(storedCart) : [];

            if (itemsFromStorage.length === 0) {
                setIsLoading(false);
                return;
            }

            try {
                const productPromises = itemsFromStorage.map(item =>
                    axios.get(`${API_URL}/product/${item.productId}`)
                );
                const responses = await Promise.all(productPromises);
                const combinedData = itemsFromStorage.map(item => {
                    const apiProduct = responses.find(
                        response => response.data.productId === item.productId
                    )?.data;
                    return {
                        ...apiProduct,
                        quantity: item.quantity,
                        productId: item.productId,
                    };
                });
                setDetailedCartItems(combinedData);
            } catch (err) {
                console.error("Erro ao buscar detalhes dos produtos:", err);
                setError("Não foi possível carregar os produtos do carrinho. Tente novamente.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCartDetails();
    }, []);

    const handleRemoveFromCart = (productId) => {
        const updatedCart = detailedCartItems.filter(item => item.productId !== productId);
        setDetailedCartItems(updatedCart);

        const updatedCartForStorage = updatedCart.map(({ productId, quantity }) => ({ productId, quantity }));
        localStorage.setItem('shoppingCart', JSON.stringify(updatedCartForStorage));
    };

    const handleUpdateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            handleRemoveFromCart(productId);
            return;
        }

        const updatedCart = detailedCartItems.map(item => {
            if (item.productId === productId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });

        setDetailedCartItems(updatedCart);

        const updatedCartForStorage = updatedCart.map(({ productId, quantity }) => ({ productId, quantity }));
        localStorage.setItem('shoppingCart', JSON.stringify(updatedCartForStorage));
    };

    const totalCartValue = detailedCartItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    const formattedTotalCartValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(totalCartValue);


    const handleSubmit = async (e) => {
        e.preventDefault(); 

    const itemsForBackend = detailedCartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
    }));

    const orderData = {
        listItemOrder: itemsForBackend
    };

    try {
        const response = await axios.post(
            `${API_URL}/order/new-order`, orderData, 
            { withCredentials: true } 
        );

        if (response.status === 200) {
            alert('Pedido criado com sucesso!');
            localStorage.removeItem('shoppingCart');
            setDetailedCartItems([]);
        }
    } catch (error) {
        console.error('Erro ao criar o pedido:', error);
        if (error.response?.status === 403) {
             alert('Você não está autenticado. Por favor, faça o login.');
        } else {
             alert('Houve um erro ao finalizar seu pedido. Tente novamente.');
        }
    }
};




    if (isLoading) {
        return <div className="p-8 text-center font-semibold">Carregando seu carrinho...</div>;
    }


    return (

        <div className="min-h-screen flex flex-col">
            <NavBarPublic />

            <div className="container mx-auto p-4 md:p-8 flex-grow">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Seu Carrinho</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2">
                        {detailedCartItems.length === 0 ? (
                            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                                <p className="text-gray-500">Seu carrinho está vazio.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {detailedCartItems.map(item => (
                                    <CartProduct
                                        key={item.productId}
                                        product={item}
                                        onRemove={handleRemoveFromCart}
                                        onUpdateQuantity={handleUpdateQuantity}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
                            <h2 className="text-xl font-semibold mb-4 border-b pb-4">Resumo do Pedido</h2>

                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-600">Valor total dos produtos:</span>
                                <span className="text-xl font-bold text-gray-800">{formattedTotalCartValue}</span>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={detailedCartItems.length === 0}
                                className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                Fazer Pagamento
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );

}

export default Cart;
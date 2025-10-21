import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBarPublic from '../../components/navbar/NavBarPublic';
import { fetchImageAsBlobUrl } from '../../service/downImage';
import Footer from '../../components/footer/Footer';
import { Toaster, toast } from 'react-hot-toast';

function PageProduct() {
    const { productId } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState('');
    const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/400?text=Carregando...');

    useEffect(() => {
        setProductDetails(null);
        setError('');

        axios.get(`https://api.lucasbuild.xyz/product/${productId}`)
            .then(response => {
                setProductDetails(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar detalhes do produto:", error);
                setError("Não foi possível carregar o produto. Tente novamente mais tarde.");
            });
    }, [productId]);

    useEffect(() => {

        if (productDetails && productDetails.imageName) {
            const loadImage = async () => {
                const blobUrl = await fetchImageAsBlobUrl(productDetails.imageName);
                setImageUrl(blobUrl);
            };
            loadImage();
        }

        return () => {
            if (imageUrl && imageUrl.startsWith('blob:')) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [productDetails]);

    const handleDecreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleAddToCart = () => {
        if (!productDetails) {
            console.error("Detalhes do produto não encontrados!");
            return;
        }

        const currentCartString = localStorage.getItem('shoppingCart');
        let cart = currentCartString ? JSON.parse(currentCartString) : [];
        const existingProductIndex = cart.findIndex(item => item.productId === productDetails.productId);
        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += quantity;
        } else {
            cart.push({
                productId: productDetails.productId,
                productName: productDetails.nameProduct,
                quantity: quantity
            });
        }
        localStorage.setItem('carrinhoIsEmpty', 'false');
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        console.log("Carrinho atualizado:", cart);
        toast.success(
            `${quantity} x ${productDetails.nameProduct} foi adicionado ao carrinho!`, { duration: 3000 }
        );
        window.dispatchEvent(new Event('storage'));
    };

    if (error) {
        return <div className="text-center p-12 text-red-500">{error}</div>;
    }

    if (!productDetails) {
        return <div className="text-center p-12 text-gray-500">Carregando...</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <NavBarPublic />
            <Toaster position="top-right" reverseOrder={false} />
            <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    <div className="flex justify-center items-center">
                        <img
                            src={imageUrl}
                            alt={productDetails.nameProduct}
                            className="w-full max-w-sm md:max-w-full h-auto object-cover rounded-lg shadow-lg border border-gray-200"
                        />
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">{productDetails.nameProduct}</h1>
                        <p className="text-3xl font-bold text-gray-900 my-4">
                            R$ {productDetails.price != null ? productDetails.price.toFixed(2).replace('.', ',') : 'Preço indisponível'}
                        </p>

                        <p>Codigo: {productDetails?.productId}</p>

                        <div className="my-6 flex items-center">
                            <label className="mr-4 text-base text-gray-700">Quantidade:</label>
                            <div className="flex items-center border border-gray-300 rounded-md">
                                <button onClick={handleDecreaseQuantity} className="w-10 h-10 text-xl font-semibold text-gray-600 hover:bg-gray-100 rounded-l-md transition">-</button>
                                <span className="w-12 text-center text-lg font-semibold text-gray-800">
                                    {quantity}
                                </span>
                                <button onClick={handleIncreaseQuantity} className="w-10 h-10 text-xl font-semibold text-gray-600 hover:bg-gray-100 rounded-r-md transition">+</button>
                            </div>
                        </div>

                        <div className="mt-6 flex w-full flex-col gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="w-full cursor-pointer rounded-lg bg-[#8b38d1] px-6 py-3 text-lg font-bold text-white shadow-md transition-colors duration-300 hover:bg-[#553b6b] focus:outline-none focus:ring-2 focus:ring-[#8b38d1] focus:ring-opacity-50"
                            > Adicionar ao Carrinho
                            </button>
                            <a href="/cart"><button
                                className="w-full cursor-pointer rounded-lg bg-green-600 px-6 py-3 text-lg font-bold text-white shadow-md transition-colors duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                            > Finalizar Compra
                            </button></a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Descrição do produto</h2>
                    <p className="text-gray-600 leading-relaxed">{productDetails.description}</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default PageProduct;
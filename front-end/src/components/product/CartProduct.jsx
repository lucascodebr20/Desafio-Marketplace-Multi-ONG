import React, { useState, useEffect } from 'react';
import { fetchImageAsBlobUrl } from '../../service/downImage';

function CartProduct({ product, onRemove, onUpdateQuantity }) {
    const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/150?text=...');

    useEffect(() => {
        let objectUrl = null;

        const loadImage = async () => {
            if (product.imageName) {
                objectUrl = await fetchImageAsBlobUrl(product.imageName);
                setImageUrl(objectUrl);
            }
        };

        loadImage();

        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [product.imageName]);

    const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(product.price);

    const formattedTotalPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(product.price * product.quantity);

    return (
        <div className="flex items-center p-4 bg-white rounded-lg shadow-md mb-4 gap-4">

            <img
                src={imageUrl}
                alt={product.nameProduct}
                className="w-24 h-24 object-cover rounded-md flex-shrink-0"
            />

            <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">{product.nameProduct}</h3>
                <p className="text-gray-600">Preço Unitário: {formattedPrice}</p>
                <p className="text-md font-bold text-gray-800 mt-2">
                    Total: {formattedTotalPrice}
                </p>
            </div>

            <div className="flex flex-col items-center gap-4">
                <button
                    onClick={() => onRemove(product.productId)}
                    className="text-red-500 font-semibold hover:text-red-700 transition"
                >
                    Remover
                </button>

                <div className="flex items-center gap-3 border border-gray-300 rounded-lg">
                    <button
                        onClick={() => onUpdateQuantity(product.productId, product.quantity - 1)}
                        className="px-3 py-1 text-xl font-bold text-gray-700 hover:bg-gray-200 rounded-l-lg"
                    >
                        -
                    </button>
                    <span className="font-semibold text-gray-800 w-8 text-center">{product.quantity}</span>
                    <button
                        onClick={() => onUpdateQuantity(product.productId, product.quantity + 1)}
                        className="px-3 py-1 text-xl font-bold text-gray-700 hover:bg-gray-200 rounded-r-lg"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartProduct;
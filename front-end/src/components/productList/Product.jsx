import React, { useState, useEffect } from 'react';
import { fetchImageAsBlobUrl } from '../../service/downImage'; 

function Product({ product, onEdit, onDelete }) {
    const [displayImageUrl, setDisplayImageUrl] = useState('https://via.placeholder.com/150');

    useEffect(() => {
        let isMounted = true; 

        const loadImage = async () => {
            if (product.imageName) {
                const blobUrl = await fetchImageAsBlobUrl(product.imageName);
                if (isMounted) {
                    setDisplayImageUrl(blobUrl);
                }
            } else {
                if (isMounted) {
                    setDisplayImageUrl(product.imageUrl || 'https://via.placeholder.com/150');
                }
            }
        };

        loadImage();

        return () => {
            isMounted = false;
            if (displayImageUrl && displayImageUrl.startsWith('blob:')) {
                URL.revokeObjectURL(displayImageUrl);
            }
        };
    }, [product.imageName, product.imageUrl, displayImageUrl]);

    return (
        <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row p-4 mb-4 transition-transform duration-300 hover:shadow-xl hover:scale-[1.02]">
            <img 
                src={displayImageUrl} 
                alt={product.nameProduct} 
                className="w-full md:w-28 h-40 md:h-28 object-cover rounded-md mr-0 md:mr-6 mb-4 md:mb-0" 
            />
            <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{product.nameProduct}</h2>
                <div className="flex flex-col mt-2">
                    <p className="text-lg font-semibold text-green-600">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</p>
                    <span className="text-sm text-gray-500">Estoque: {product.stockQty}</span>
                </div>
            </div>
            <div className="flex flex-col justify-center space-y-3 mt-4 md:mt-0 md:ml-6 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
                <button onClick={() => onEdit(product.productId)} className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors w-full md:w-auto">Editar Produto</button>
                <button onClick={() => onDelete(product.productId)} className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors w-full md:w-auto">Excluir Produto</button>
            </div>
        </div>
    );
}

export default Product;
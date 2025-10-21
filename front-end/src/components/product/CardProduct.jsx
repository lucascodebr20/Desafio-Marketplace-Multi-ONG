import React, { useState, useEffect } from 'react';
import { fetchImageAsBlobUrl } from '../../service/downImage';

function ProductCard({ product }) {
    const [displayImageUrl, setDisplayImageUrl] = useState('https://via.placeholder.com/400x400?text=Carregando...');

    useEffect(() => {
        let isMounted = true;
        const currentBlobUrl = displayImageUrl;

        const loadImage = async () => {
            if (product.imageName) {
                try {
                    const blobUrl = await fetchImageAsBlobUrl(product.imageName);
                    if (isMounted) setDisplayImageUrl(blobUrl);
                } catch (error) {
                    console.error("Falha ao carregar a imagem via Blob:", error);
                    if (isMounted) setDisplayImageUrl('https://via.placeholder.com/400x400?text=Imagem+Indisponível');
                }
            } else if (product.imageUrl) {
                if (isMounted) setDisplayImageUrl(product.imageUrl);
            } else {
                if (isMounted) setDisplayImageUrl('https://via.placeholder.com/400x400?text=Imagem+Indisponível');
            }
        };

        loadImage();
        return () => {
            isMounted = false;
            if (currentBlobUrl && currentBlobUrl.startsWith('blob:')) {
                URL.revokeObjectURL(currentBlobUrl);
            }
        };
    }, [product.imageName, product.imageUrl]);

    const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(product.price);

    return (
        <a href={`/product/${product.productId}`}>
            <div className="group bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <div className="relative w-full aspect-square">
                    <img
                        src={displayImageUrl}
                        alt={product.nameProduct}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate" title={product.nameProduct}>
                        {product.nameProduct}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                        {formattedPrice}
                    </p>
                    <p className="text-sm text-gray-500 mt-3">
                        Vendido pela ong <span className="font-medium text-gray-700">{product.nameOrganization}</span>
                    </p>
                </div>
            </div>
        </a>
    );
}

export default ProductCard;

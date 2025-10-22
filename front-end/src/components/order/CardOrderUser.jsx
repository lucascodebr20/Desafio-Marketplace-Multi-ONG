import React, { useState, useEffect } from 'react';
import { fetchImageAsBlobUrl } from '../../service/downImage';

function OrderItem({ item }) {

    const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/150?text=...');

    useEffect(() => {
        const loadImage = async () => {
            const blobUrl = await fetchImageAsBlobUrl(item.imageName);
            setImageUrl(blobUrl);
        }; loadImage();

        return () => {
            if (imageUrl && imageUrl.startsWith('blob:')) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [item.imageName]);

    return (
        <div className="flex items-center justify-between p-2 border-b border-gray-200 last:border-b-0">
            <div className="flex items-center">
                <img
                    src={imageUrl}
                    alt={item.nameAtPurchase}
                    className="w-16 h-16 object-cover rounded-md mr-4 bg-gray-200"
                />
                <div>
                    <p className="font-semibold text-gray-800">{item.nameAtPurchase}</p>
                    <p className="text-sm text-gray-500">
                        {item.quantity} x R$ {item.priceAtPurchase.toFixed(2)}
                    </p>
                </div>
            </div>
            <p className="font-semibold text-gray-800">
                R$ {(item.quantity * item.priceAtPurchase).toFixed(2)}
            </p>
        </div>
    );
}


function CardOrderUser({ order }) {
    
    const formattedDate = new Date(order.orderDate).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    const totalAmount = order.listOrder.reduce((acc, item) => {
        const price = item.priceAtPurchase || 0;
        const quantity = item.quantity || 0;
        return acc + price * quantity;
    }, 0);

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-6">
            <div className="bg-gray-50 p-4 flex justify-between items-center border-b border-gray-200">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">{order.organizationName}</h2>
                    <p className="text-sm text-gray-500">Pedido nº: {order.orderId}</p>
                    <p className="text-sm text-gray-500">Realizado em: {formattedDate}</p>
                </div>
                <div className="text-right">
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-md">
                        {order.statusOrder}
                    </span>
                </div>
            </div>

            <div className="p-2">
                {order.listOrder.map((item, index) => (
                    <OrderItem key={index} item={item} />
                ))}
            </div>

            <div className="bg-gray-50 p-4 text-right">
                <p className="text-gray-600">Total do Pedido:</p>
                <p className="text-2xl font-bold text-gray-900">
                    R$ {totalAmount.toFixed(2)}
                </p>
            </div>
        </div>
    );
}

export default CardOrderUser;
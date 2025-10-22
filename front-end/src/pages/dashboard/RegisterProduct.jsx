import React, { useState, useRef } from 'react';
import { validateImage, processImage } from '../../service/processImage';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import { API_URL } from '../../config/api';
import axios from 'axios';

function RegisterProduct() {

    const [formData, setFormData] = useState({
        nameProduct: '',
        description: '',
        price: '',
        stockQty: '',
        weightGrams: ''
    });

    const [uploadMethod, setUploadMethod] = useState('upload');
    const [imageUrl, setImageUrl] = useState('');
    const [processedImageBlob, setProcessedImageBlob] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!validateImage(file)) {
            alert('Formato de imagem inválido! Por favor, use JPEG ou PNG.');
            fileInputRef.current.value = null;
            setImagePreview('');
            setProcessedImageBlob(null);
            return;
        }

        setImageUrl('');
        setImagePreview(URL.createObjectURL(file));

        try {
            const blob = await processImage(file);
            setProcessedImageBlob(blob);
        } catch (error) {
            console.error('Erro ao processar a imagem:', error);
            alert('Ocorreu um erro ao processar a imagem.');
            setImagePreview('');
            setProcessedImageBlob(null);
        }
    };

    const handleUrlChange = (e) => {
        const url = e.target.value;
        setImageUrl(url);
        setImagePreview(url);
        setProcessedImageBlob(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = `${API_URL}/dashboard-product`;
        const config = { withCredentials: true };

        try {

            if (uploadMethod === 'upload') {
                const dataToSubmit = new FormData();
                Object.entries(formData).forEach(([key, value]) => {
                    dataToSubmit.append(key, value);
                });
                dataToSubmit.append('imageFile', processedImageBlob, 'product-image.webp');
                const response = await axios.post(url, dataToSubmit, config);
                toast.success('Produto cadastrado com sucesso!');
                setTimeout(() => {
                    window.location.reload();
                }, 1500);

            } else if (uploadMethod === 'url') {
                if (!imageUrl.trim()) {
                    alert('Por favor, insira a URL da imagem.');
                    return;
                }

                const dataToSubmit = {
                    ...formData,
                    imageUrl: imageUrl
                };

                console.log('Enviando dados via JSON:', dataToSubmit);
                const response = await axios.post(url, dataToSubmit, config);

                console.log('Produto cadastrado com sucesso!', response.data);
            }

        } catch (error) {
            console.error('Ocorreu um erro ao cadastrar o produto:', error);
            alert('Falha ao cadastrar o produto. Verifique o console para mais detalhes.');
        }
    };

    const inputStyle = "w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600";
    const labelStyle = "block text-sm font-semibold text-gray-800 mb-1.5";

    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Cadastrar Novo Produto</h1>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-1">
                        <label className={labelStyle}>Imagem do Produto</label>

                        <div className="flex border-b border-gray-200 mb-2">
                            <button type="button" onClick={() => setUploadMethod('upload')} className={`px-4 py-2 text-sm font-medium ${uploadMethod === 'upload' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
                                Upload
                            </button>
                            <button type="button" onClick={() => setUploadMethod('url')} className={`px-4 py-2 text-sm font-medium ${uploadMethod === 'url' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
                                URL
                            </button>
                        </div>

                        {uploadMethod === 'upload' ? (
                            <>
                                <input type="file" accept="image/png, image/jpeg" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
                                <div
                                    className="mt-1 w-full aspect-square bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    {imagePreview && !imageUrl ? (
                                        <img src={imagePreview} alt="Pré-visualização" className="w-full h-full object-cover rounded-lg" />
                                    ) : (
                                        <div className="flex flex-col text-center text-gray-500 p-4">
                                            <p>Clique para enviar uma imagem</p>
                                            <span className="p-1 text-xs">(PNG, JPEG)</span>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="mt-1">
                                <input
                                    type="text"
                                    placeholder="https://exemplo.com/imagem.png"
                                    value={imageUrl}
                                    onChange={handleUrlChange}
                                    className={inputStyle}
                                />
                                <div className="mt-2 w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                    {imagePreview && imageUrl ? (
                                        <img src={imagePreview} alt="Pré-visualização da URL" className="w-full h-full object-cover" />
                                    ) : (
                                        <p className="text-xs text-gray-400">Preview da imagem</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label htmlFor="nameProduct" className={labelStyle}>
                                    Nome do Produto <span className="text-red-500">*</span>
                                </label>
                                <input type="text" name="nameProduct" id="nameProduct" value={formData.nameProduct} onChange={handleChange} required className={inputStyle} />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="description" className={labelStyle}>Descrição</label>
                                <textarea name="description" id="description" rows="4" value={formData.description} onChange={handleChange} className={inputStyle}></textarea>
                            </div>
                            <div>
                                <label htmlFor="price" className={labelStyle}>
                                    Preço (R$) <span className="text-red-500">*</span>
                                </label>
                                <input type="number" name="price" id="price" step="0.01" placeholder="Ex: 00.00" value={formData.price} onChange={handleChange} required className={inputStyle} />
                            </div>
                            <div>
                                <label htmlFor="stockQty" className={labelStyle}>
                                    Estoque <span className="text-red-500">*</span>
                                </label>
                                <input type="number" name="stockQty" id="stockQty" placeholder="Ex: 50" value={formData.stockQty} onChange={handleChange} required className={inputStyle} />
                            </div>
                            <div>
                                <label htmlFor="weightGrams" className={labelStyle}>Peso (gramas)</label>
                                <input type="number" name="weightGrams" id="weightGrams" placeholder="Ex: 250" value={formData.weightGrams} onChange={handleChange} className={inputStyle} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200 text-right">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2.5 px-8 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cadastrar Produto
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegisterProduct;
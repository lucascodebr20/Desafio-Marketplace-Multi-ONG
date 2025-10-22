import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config/api';
import axios from 'axios';
import Title from '../../components/tittle/Title';

function Register() {

    const navigate = useNavigate();
    const [isOng, setIsOng] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        organizationName: '',
        CNPJ: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSubmit = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            userRole: isOng ? "ONG" : "USER"
        };

        if (isOng) {
            dataToSubmit.organizationName = formData.organizationName;
            dataToSubmit.CNPJ = formData.CNPJ;
        }

        if (isOng) {
            axios.post(`${API_URL}/auth/register-user-organization`, dataToSubmit)
                .then(response => {
                    navigate('/login');
                })
                .catch(error => {
                    console.error("Erro ao cadastrar ONG:", error);
                    alert("Ocorreu um erro ao cadastrar a ONG. Tente novamente.");
                });
            return;
        } else {
            axios.post(`${API_URL}/auth/register-user`, dataToSubmit)
                .then(response => {
                    navigate('/login');
                })
                .catch(error => {
                    console.error("Erro ao cadastrar:", error);
                    alert("Ocorreu um erro ao cadastrar. Tente novamente.");
                });
        }
    };

    return (
        <main className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">

                <Title className="text-3xl font-bold text-center mb-8" />

                <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
                    Crie sua Conta
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nome Completo
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#8b38d1]"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="seu.email@exemplo.com"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#8b38d1]"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Senha
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••••"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#8b38d1]"
                            required
                        />
                    </div>

                    <div className="flex items-center mb-6">
                        <input
                            type="checkbox"
                            id="isOng"
                            checked={isOng}
                            onChange={() => setIsOng(!isOng)}
                            className="h-4 w-4 rounded border-gray-300 text-[#8b38d1] focus:ring-[#8b38d1] cursor-pointer"
                        />
                        <label htmlFor="isOng" className="ml-2 block text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                            Se cadastrar como ONG?
                        </label>
                    </div>

                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOng ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="mb-5">
                            <label htmlFor="organizationName" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Nome da Organização
                            </label>
                            <input
                                type="text"
                                id="organizationName"
                                name="organizationName"
                                value={formData.organizationName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#8b38d1]"
                                required={isOng}
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="cnpj" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                CNPJ
                            </label>
                            <input
                                type="text"
                                id="cnpj"
                                name="CNPJ"
                                value={formData.CNPJ}
                                onChange={handleChange}
                                placeholder="00.000.000/0000-00"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#8b38d1]"
                                required={isOng}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-3 rounded-lg bg-[#8b38d1] text-white hover:bg-[#553b6b] transition-colors duration-300 font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b38d1] dark:focus:ring-offset-gray-800"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
        </main>
    );
}

export default Register;
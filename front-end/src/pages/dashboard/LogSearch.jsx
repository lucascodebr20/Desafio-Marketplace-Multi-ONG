import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config/api';
import axios from 'axios';

function FilterDisplay({ jsonString }) {
    let filters;
    try {
        if (!jsonString) return null;
        filters = JSON.parse(jsonString);
    } catch (error) {
        return <span className="text-gray-400">Filtro inválido</span>;
    }

    const filterEntries = Object.entries(filters);

    return (
        <div className="flex flex-col gap-2">
            {filterEntries.map(([key, value]) => {
                if (value === null || (Array.isArray(value) && value.length === 0)) {
                    return null;
                }
                const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                return (
                    <div key={key}>
                        <strong className="text-gray-700 text-xs font-medium">{formattedKey}:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {Array.isArray(value) ? (
                                value.map((item, index) => (
                                    <span key={index} className="px-2 py-0.5 text-xs font-semibold text-purple-800 bg-purple-100 rounded-full">
                                        {item}
                                    </span>
                                ))
                            ) : (
                                <span className="px-2 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 rounded-full">
                                    {String(value)}
                                </span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function LogSearch() {
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/dashboard-admin/search-log`,
                    { withCredentials: true }
                );
                setLogs(response.data);
            } catch (err) {
                setError('Falha ao carregar os logs. Verifique se a API está em execução.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLogs();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(dateString).toLocaleString('pt-BR', options);
    };

    const formatFiltersForCSV = (jsonString) => {
        try {
            if (!jsonString) return '';
            const filters = JSON.parse(jsonString);
            return Object.entries(filters)
                .map(([key, value]) => {
                    if (value === null || (Array.isArray(value) && value.length === 0)) return null;
                    const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    const formattedValue = Array.isArray(value) ? value.join(' | ') : value;
                    return `${formattedKey}: ${formattedValue}`;
                })
                .filter(Boolean)
                .join('; ');
        } catch (e) {
            return jsonString;
        }
    };

    const handleDownloadCSV = () => {
        if (logs.length === 0) {
            alert("Não há dados para exportar.");
            return;}
        const csvHeader = ["Input da Busca", "Filtros Gerados", "Sucesso", "Fallback Aplicado", "Qtd. Itens", "Data de Criação"].join(',');
        const csvRows = logs.map(log => [
            `"${log.searchInput || ''}"`,
            `"${formatFiltersForCSV(log.generatedFilters)}"`,
            log.isSuccess ? 'Sim' : 'Não',
            log.wasFallbackApplied ? 'Sim' : 'Não',
            log.itemCount,
            `"${formatDate(log.createdAt)}"`
        ].join(',')).join('\n');
        const csvContent = `${csvHeader}\n${csvRows}`;
        const blob = new Blob(['\uFEFF', csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'logs-de-busca.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (isLoading) {
        return <div className="p-6 text-center">Carregando dados...</div>;
    }
    if (error) {
        return <div className="p-6 text-center text-red-500">{error}</div>;
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="sm:flex sm:items-center sm:justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Logs de Busca</h1>
                    <button
                        onClick={handleDownloadCSV}
                        className="mt-4 sm:mt-0 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Baixar em CSV
                    </button>
                </div>

                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Input da Busca</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Sucesso</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Fallback</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Qtd. Itens</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {logs.length > 0 ? (
                                logs.map((log) => (
                                    <React.Fragment key={log.id || log.createdAt}>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{log.searchInput}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${log.isSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {log.isSuccess ? 'Sim' : 'Não'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{log.wasFallbackApplied ? 'Sim' : 'Não'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{log.itemCount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(log.createdAt)}</td>
                                        </tr>
                                        {log.generatedFilters && (
                                            <tr className="bg-white hover:bg-gray-50">
                                                <td colSpan="5" className="px-6 py-4">
                                                    <FilterDisplay jsonString={log.generatedFilters} />
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Nenhum log encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default LogSearch;